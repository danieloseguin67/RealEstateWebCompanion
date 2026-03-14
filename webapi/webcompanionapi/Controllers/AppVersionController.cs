using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppVersionController : ControllerBase
{
    private readonly AppDbContext _db;

    public AppVersionController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<AppVersionDto>> Get()
    {
        var entity = await _db.AppVersions.FirstOrDefaultAsync();
        if (entity == null) return NotFound();
        return Ok(MapToDto(entity));
    }

    [HttpPut]
    public async Task<IActionResult> Update(AppVersionDto dto)
    {
        var entity = await _db.AppVersions.FirstOrDefaultAsync();
        if (entity == null)
        {
            entity = new AppVersion { Id = 1 };
            _db.AppVersions.Add(entity);
        }
        UpdateEntity(entity, dto);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static AppVersionDto MapToDto(AppVersion a) => new()
    {
        Version = a.Version,
        AppName = a.AppName,
        Author = a.Author,
        Company = a.Company,
        Copyright = a.Copyright,
        UpdateDate = a.UpdateDate,
    };

    private static void UpdateEntity(AppVersion entity, AppVersionDto dto)
    {
        entity.Version = dto.Version;
        entity.AppName = dto.AppName;
        entity.Author = dto.Author;
        entity.Company = dto.Company;
        entity.Copyright = dto.Copyright;
        entity.UpdateDate = dto.UpdateDate;
    }
}
