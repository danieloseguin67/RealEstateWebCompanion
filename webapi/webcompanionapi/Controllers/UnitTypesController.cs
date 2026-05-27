using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UnitTypesController : ControllerBase
{
    private readonly AppDbContext _db;

    public UnitTypesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UnitTypeDto>>> GetAll()
    {
        var unitTypes = await _db.UnitTypes.ToListAsync();
        return Ok(unitTypes.Select(MapToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UnitTypeDto>> GetById(int id)
    {
        var unitType = await _db.UnitTypes.FindAsync(id);
        if (unitType == null) return NotFound();
        return Ok(MapToDto(unitType));
    }

    [HttpPost]
    public async Task<ActionResult<UnitTypeDto>> Create(UnitTypeDto dto)
    {
        var entity = MapToEntity(dto);
        _db.UnitTypes.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, MapToDto(entity));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UnitTypeDto dto)
    {
        var entity = await _db.UnitTypes.FindAsync(id);
        if (entity == null) return NotFound();

        entity.UnitTypeNameEn = dto.UnitTypeNameEn;
        entity.UnitTypeNameFr = dto.UnitTypeNameFr;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.UnitTypes.FindAsync(id);
        if (entity == null) return NotFound();
        _db.UnitTypes.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static UnitTypeDto MapToDto(UnitType u) => new()
    {
        Id = u.Id,
        UnitTypeNameEn = u.UnitTypeNameEn,
        UnitTypeNameFr = u.UnitTypeNameFr,
    };

    private static UnitType MapToEntity(UnitTypeDto dto) => new()
    {
        // Id intentionally omitted – the database auto-generates it on INSERT
        UnitTypeNameEn = dto.UnitTypeNameEn,
        UnitTypeNameFr = dto.UnitTypeNameFr,
    };
}
