using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeaturesController : ControllerBase
{
    private readonly AppDbContext _db;

    public FeaturesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FeatureDto>>> GetAll()
    {
        var features = await _db.Features.ToListAsync();
        return Ok(features.Select(MapToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<FeatureDto>> GetById(int id)
    {
        var feature = await _db.Features.FindAsync(id);
        if (feature == null) return NotFound();
        return Ok(MapToDto(feature));
    }

    [HttpPost]
    public async Task<ActionResult<FeatureDto>> Create(FeatureDto dto)
    {
        var entity = MapToEntity(dto);
        _db.Features.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, MapToDto(entity));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, FeatureDto dto)
    {
        var entity = await _db.Features.FindAsync(id);
        if (entity == null) return NotFound();

        entity.ToggleImage = dto.ToggleImage;
        entity.FrenchName = dto.FrenchName;
        entity.EnglishName = dto.EnglishName;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.Features.FindAsync(id);
        if (entity == null) return NotFound();
        _db.Features.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static FeatureDto MapToDto(Feature f) => new()
    {
        Id = f.Id,
        ToggleImage = f.ToggleImage,
        FrenchName = f.FrenchName,
        EnglishName = f.EnglishName,
    };

    private static Feature MapToEntity(FeatureDto dto) => new()
    {
        ToggleImage = dto.ToggleImage,
        FrenchName = dto.FrenchName,
        EnglishName = dto.EnglishName,
    };
}
