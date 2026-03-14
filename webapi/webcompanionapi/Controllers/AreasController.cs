using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AreasController : ControllerBase
{
    private readonly AppDbContext _db;

    public AreasController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AreaDto>>> GetAll()
    {
        var areas = await _db.Areas.ToListAsync();
        return Ok(areas.Select(MapToDto));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AreaDto>> GetById(string id)
    {
        var area = await _db.Areas.FindAsync(id);
        if (area == null) return NotFound();
        return Ok(MapToDto(area));
    }

    [HttpPost]
    public async Task<ActionResult<AreaDto>> Create(AreaDto dto)
    {
        var entity = MapToEntity(dto);
        _db.Areas.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, MapToDto(entity));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, AreaDto dto)
    {
        var entity = await _db.Areas.FindAsync(id);
        if (entity == null) return NotFound();

        entity.Name = dto.Name;
        entity.NameFr = dto.NameFr;
        entity.NameEn = dto.NameEn;
        entity.Description = dto.Description;
        entity.DescriptionEn = dto.DescriptionEn;
        entity.Link = dto.Link;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var entity = await _db.Areas.FindAsync(id);
        if (entity == null) return NotFound();
        _db.Areas.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static AreaDto MapToDto(Area a) => new()
    {
        Id = a.Id,
        Name = a.Name,
        NameFr = a.NameFr,
        NameEn = a.NameEn,
        Description = a.Description,
        DescriptionEn = a.DescriptionEn,
        Link = a.Link,
    };

    private static Area MapToEntity(AreaDto dto) => new()
    {
        Id = dto.Id,
        Name = dto.Name,
        NameFr = dto.NameFr,
        NameEn = dto.NameEn,
        Description = dto.Description,
        DescriptionEn = dto.DescriptionEn,
        Link = dto.Link,
    };
}
