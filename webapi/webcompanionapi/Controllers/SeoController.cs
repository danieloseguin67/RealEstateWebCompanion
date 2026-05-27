using System.Text.RegularExpressions;
using System.Xml;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeoController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IHttpClientFactory _httpClientFactory;

    public SeoController(AppDbContext db, IHttpClientFactory httpClientFactory)
    {
        _db = db;
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet("discover")]
    public async Task<ActionResult<string[]>> DiscoverPages([FromQuery] string url, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(url))
            return BadRequest("url query parameter is required.");

        if (!Uri.TryCreate(url, UriKind.Absolute, out var parsedUri) ||
            (parsedUri.Scheme != Uri.UriSchemeHttp && parsedUri.Scheme != Uri.UriSchemeHttps))
            return BadRequest("Invalid URL. Only http and https are allowed.");

        var client = _httpClientFactory.CreateClient();
        client.Timeout = TimeSpan.FromSeconds(15);
        client.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", "Mozilla/5.0 (compatible; WebCompanionBot/1.0)");

        // Try sitemap.xml first
        var sitemapUrl = $"{url.TrimEnd('/')}/sitemap.xml";
        try
        {
            var sitemapResp = await client.GetAsync(sitemapUrl, cancellationToken);
            if (sitemapResp.IsSuccessStatusCode)
            {
                var xml = await sitemapResp.Content.ReadAsStringAsync(cancellationToken);
                var paths = ParseSitemapPaths(xml);
                if (paths.Length > 0) return Ok(paths);
            }
        }
        catch { /* fall through to homepage */ }

        // Fall back to homepage link extraction
        try
        {
            var homeResp = await client.GetAsync(url, cancellationToken);
            if (homeResp.IsSuccessStatusCode)
            {
                var html = await homeResp.Content.ReadAsStringAsync(cancellationToken);
                return Ok(ParseHomepagePaths(html, parsedUri.Host));
            }
        }
        catch (Exception ex)
        {
            return StatusCode(502, $"Could not reach the target URL: {ex.Message}");
        }

        return Ok(Array.Empty<string>());
    }

    private static string[] ParseSitemapPaths(string xml)
    {
        var paths = new List<string>();
        try
        {
            var doc = new XmlDocument();
            doc.LoadXml(xml);
            var ns = new XmlNamespaceManager(doc.NameTable);
            ns.AddNamespace("sm", "http://www.sitemaps.org/schemas/sitemap/0.9");
            var locs = doc.SelectNodes("//sm:loc", ns);
            if (locs != null)
                foreach (XmlNode loc in locs)
                    if (Uri.TryCreate(loc.InnerText?.Trim(), UriKind.Absolute, out var locUri))
                        paths.Add(locUri.AbsolutePath);
        }
        catch { /* invalid XML */ }
        return paths.ToArray();
    }

    private static string[] ParseHomepagePaths(string html, string host)
    {
        var discovered = new HashSet<string>();
        var skippedExtensions = new Regex(@"\.(jpg|jpeg|png|gif|css|js|pdf|zip|ico|svg|woff2?)$", RegexOptions.IgnoreCase);
        foreach (Match m in Regex.Matches(html, @"href=[""']([^""']+)[""']"))
        {
            var href = m.Groups[1].Value.Trim();
            string? path = null;
            if (href.StartsWith("http", StringComparison.OrdinalIgnoreCase))
            {
                if (Uri.TryCreate(href, UriKind.Absolute, out var hrefUri) &&
                    string.Equals(hrefUri.Host, host, StringComparison.OrdinalIgnoreCase))
                    path = hrefUri.AbsolutePath;
            }
            else if (href.StartsWith('/'))
            {
                path = href.Split('?')[0].Split('#')[0];
            }

            if (path != null && !skippedExtensions.IsMatch(path))
                discovered.Add(path);
        }
        return discovered.ToArray();
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SeoPageDto>>> GetAll()
    {
        var pages = await _db.SeoPages.ToListAsync();
        return Ok(pages.Select(MapToDto));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SeoPageDto>> GetById(string id)
    {
        var page = await _db.SeoPages.FindAsync(id);
        if (page == null) return NotFound();
        return Ok(MapToDto(page));
    }

    [HttpPost]
    public async Task<ActionResult<SeoPageDto>> Create(SeoPageDto dto)
    {
        if (await _db.SeoPages.AnyAsync(s => s.Id == dto.Id))
            return Conflict($"SEO page with id '{dto.Id}' already exists.");

        var entity = MapToEntity(dto);
        _db.SeoPages.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, MapToDto(entity));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, SeoPageDto dto)
    {
        if (id != dto.Id) return BadRequest();
        var entity = await _db.SeoPages.FindAsync(id);
        if (entity == null) return NotFound();

        UpdateEntity(entity, dto);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var entity = await _db.SeoPages.FindAsync(id);
        if (entity == null) return NotFound();
        _db.SeoPages.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static SeoPageDto MapToDto(SeoPage s) => new()
    {
        Id = s.Id,
        PageName = s.PageName,
        PageUrl = s.PageUrl,
        Title = s.Title,
        MetaName = s.MetaName,
        MetaDescription = s.MetaDescription,
        LastModified = s.LastModified,
        ChangeFrequency = s.ChangeFrequency,
        Priority = s.Priority,
    };

    private static SeoPage MapToEntity(SeoPageDto dto) => new()
    {
        Id = dto.Id,
        PageName = dto.PageName,
        PageUrl = dto.PageUrl,
        Title = dto.Title,
        MetaName = dto.MetaName,
        MetaDescription = dto.MetaDescription,
        LastModified = dto.LastModified,
        ChangeFrequency = dto.ChangeFrequency,
        Priority = dto.Priority,
    };

    private static void UpdateEntity(SeoPage entity, SeoPageDto dto)
    {
        entity.PageName = dto.PageName;
        entity.PageUrl = dto.PageUrl;
        entity.Title = dto.Title;
        entity.MetaName = dto.MetaName;
        entity.MetaDescription = dto.MetaDescription;
        entity.LastModified = dto.LastModified;
        entity.ChangeFrequency = dto.ChangeFrequency;
        entity.Priority = dto.Priority;
    }
}
