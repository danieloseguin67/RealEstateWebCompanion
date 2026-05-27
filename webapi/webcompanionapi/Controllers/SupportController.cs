using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SupportController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _db;

    public SupportController(IConfiguration configuration, AppDbContext db)
    {
        _configuration = configuration;
        _db = db;
    }

    [HttpPost("email")]
    public async Task<IActionResult> SendEmail([FromBody] SupportEmailRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var host = await GetSettingAsync("smtpHost", _configuration["Smtp:Host"], cancellationToken);
        var username = await GetSettingAsync("smtpUser", _configuration["Smtp:Username"], cancellationToken);
        var password = await GetSettingAsync("smtpPassword", _configuration["Smtp:Password"], cancellationToken);
        var fromEmail = await GetSettingAsync("smtpFromEmail", _configuration["Smtp:FromEmail"], cancellationToken);
        var fromName = await GetSettingAsync("smtpFromName", _configuration["Smtp:FromName"], cancellationToken) ?? "Web Companion Support";
        var toEmail = await GetSettingAsync("smtpToEmail", _configuration["Smtp:ToEmail"], cancellationToken);

        // Many SMTP providers only allow sending from the authenticated mailbox.
        // Prefer the SMTP username when it looks like an email address.
        var effectiveFromEmail = ResolveFromEmail(fromEmail, username);
        var effectiveToEmail = FirstNonEmpty(toEmail, effectiveFromEmail);

        if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(effectiveFromEmail) || string.IsNullOrWhiteSpace(effectiveToEmail))
            return StatusCode(500, "SMTP settings are incomplete. Configure smtpHost and either smtpFromEmail or smtpUser. smtpToEmail is optional.");

        var portSetting = await GetSettingAsync("smtpPort", _configuration["Smtp:Port"], cancellationToken);
        var useTlsSetting = await GetSettingAsync("smtpUseTls", _configuration["Smtp:UseTls"], cancellationToken);
        var port = ParsePort(portSetting, 587);
        var useTls = ParseBoolean(useTlsSetting, true);

        var subject = $"Support Request from {request.Name}";
        var body =
            $"Name: {request.Name}\n" +
            $"Phone: {request.Phone}\n" +
            $"Email: {request.Email}\n\n" +
            "Message:\n" +
            request.Message;

        try
        {
            using var message = new MailMessage
            {
                From = new MailAddress(effectiveFromEmail, fromName),
                Subject = subject,
                Body = body,
                IsBodyHtml = false
            };

            message.To.Add(new MailAddress(effectiveToEmail));
            message.ReplyToList.Add(new MailAddress(request.Email, request.Name));

            using var client = new SmtpClient(host, port)
            {
                EnableSsl = useTls,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Timeout = 15000
            };

            if (!string.IsNullOrWhiteSpace(username))
            {
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(username, password ?? string.Empty);
            }
            else
            {
                // Do not force Windows credentials for relay/anonymous SMDaniel SeguiDaniel SeguinnTP servers.
                client.UseDefaultCredentials = false;
                client.Credentials = null;
            }

            await client.SendMailAsync(message, cancellationToken);
            return Ok();
        }
        catch (SmtpException ex)
        {
            return StatusCode(500, $"Failed to send support email: {BuildSmtpErrorMessage(ex)}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to send support email: {BuildSmtpErrorMessage(ex)}");
        }
    }

    private async Task<string?> GetSettingAsync(string key, string? fallback, CancellationToken cancellationToken)
    {
        try
        {
            var pref = await _db.Preferences
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.PreferenceKey == key, cancellationToken);

            return string.IsNullOrWhiteSpace(pref?.PreferenceValue) ? fallback : pref.PreferenceValue;
        }
        catch
        {
            // If the database is unavailable, continue with appsettings/env fallbacks
            // so support email can still work in local/dev setups.
            return fallback;
        }
    }

    private static int ParsePort(string? value, int defaultValue)
    {
        if (int.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var parsed) && parsed > 0)
            return parsed;
        return defaultValue;
    }

    private static bool ParseBoolean(string? value, bool defaultValue)
    {
        if (string.IsNullOrWhiteSpace(value)) return defaultValue;

        var normalized = value.Trim().ToLowerInvariant();
        if (normalized is "1" or "true" or "yes" or "y") return true;
        if (normalized is "0" or "false" or "no" or "n") return false;

        return defaultValue;
    }

    private static string? FirstNonEmpty(params string?[] values)
    {
        foreach (var value in values)
        {
            if (!string.IsNullOrWhiteSpace(value))
                return value;
        }

        return null;
    }

    private static string? ResolveFromEmail(string? configuredFromEmail, string? username)
    {
        if (LooksLikeEmail(username))
            return username;

        return FirstNonEmpty(configuredFromEmail, username);
    }

    private static bool LooksLikeEmail(string? value)
    {
        return !string.IsNullOrWhiteSpace(value) && value.Contains('@');
    }

    private static string BuildSmtpErrorMessage(Exception ex)
    {
        if (ex.InnerException is not null && !string.IsNullOrWhiteSpace(ex.InnerException.Message))
            return $"{ex.Message} ({ex.InnerException.Message})";

        return ex.Message;
    }
}

public class SupportEmailRequest
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Phone { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(5000)]
    public string Message { get; set; } = string.Empty;
}