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

    public PreferencesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<PreferencesDto>> Get()
    {
        var prefs = await _db.Preferences.ToListAsync();
        var dto = new PreferencesDto
        {
            GoogleDrive = prefs.FirstOrDefault(p => p.PreferenceKey == "googledrive")?.PreferenceValue ?? string.Empty
        };
        return Ok(dto);
    }

    [HttpPut]
    public async Task<IActionResult> Update(PreferencesDto dto)
    {
        await SetPreference("googledrive", dto.GoogleDrive);
        await _db.SaveChangesAsync();
        return NoContent();
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
