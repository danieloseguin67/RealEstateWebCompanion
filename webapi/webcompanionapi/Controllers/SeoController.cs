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

    public SeoController(AppDbContext db)
    {
        _db = db;
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
