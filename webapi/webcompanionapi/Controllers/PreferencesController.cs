using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PreferencesController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _configuration;

    public PreferencesController(AppDbContext db, IConfiguration configuration)
    {
        _db = db;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<ActionResult<PreferencesDto>> Get()
    {
        var prefs = await _db.Preferences.ToListAsync();
        var dto = new PreferencesDto
        {
            AreaLink = GetPreferenceValue(prefs, "area_link", _configuration["SitePreferences:AreaLink"]),
            PhoneNumber = GetPreferenceValue(prefs, "phone_number", _configuration["SitePreferences:PhoneNumber"]),
            Email = GetPreferenceValue(prefs, "email", _configuration["SitePreferences:Email"]),
            GoogleDrive = GetPreferenceValue(prefs, "googledrive", string.Empty)
        };
        return Ok(dto);
    }

    [HttpPut]
    public async Task<IActionResult> Update(PreferencesDto dto)
    {
        await SetPreference("area_link", dto.AreaLink);
        await SetPreference("phone_number", dto.PhoneNumber);
        await SetPreference("email", dto.Email);
        await SetPreference("googledrive", dto.GoogleDrive);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static string GetPreferenceValue(IEnumerable<Preference> preferences, string key, string? fallback)
    {
        return preferences.FirstOrDefault(p => p.PreferenceKey == key)?.PreferenceValue
            ?? fallback
            ?? string.Empty;
    }

    private async Task SetPreference(string key, string value)
    {
        var existing = await _db.Preferences.FirstOrDefaultAsync(p => p.PreferenceKey == key);
        if (existing == null)
        {
            _db.Preferences.Add(new Preference { PreferenceKey = key, PreferenceValue = value });
        }
        else
        {
            existing.PreferenceValue = value;
        }
    }
}
