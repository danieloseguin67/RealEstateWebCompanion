using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApartmentFeaturesController : ControllerBase
{
    private readonly AppDbContext _db;

    public ApartmentFeaturesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ApartmentFeatureDto>>> GetAll()
    {
        var features = await _db.ApartmentFeatures.ToListAsync();
        return Ok(features.Select(MapToDto));
    }

    [HttpGet("apartment/{apartmentId}")]
    public async Task<ActionResult<IEnumerable<ApartmentFeatureDto>>> GetByApartmentId(string apartmentId)
    {
        var features = await _db.ApartmentFeatures
            .Where(f => f.ApartmentId == apartmentId)
            .ToListAsync();
        return Ok(features.Select(MapToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApartmentFeatureDto>> GetById(int id)
    {
        var feature = await _db.ApartmentFeatures.FindAsync(id);
        if (feature == null) return NotFound();
        return Ok(MapToDto(feature));
    }

    [HttpPost]
    public async Task<ActionResult<ApartmentFeatureDto>> Create(ApartmentFeatureDto dto)
    {
        var entity = MapToEntity(dto);
        _db.ApartmentFeatures.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, MapToDto(entity));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ApartmentFeatureDto dto)
    {
        var entity = await _db.ApartmentFeatures.FindAsync(id);
        if (entity == null) return NotFound();

        UpdateEntity(entity, dto);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.ApartmentFeatures.FindAsync(id);
        if (entity == null) return NotFound();
        _db.ApartmentFeatures.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static ApartmentFeatureDto MapToDto(ApartmentFeature f) => new()
    {
        Id = f.Id,
        ApartmentId = f.ApartmentId,
        Name = f.Name,
        NameEn = f.NameEn,
    };

    private static ApartmentFeature MapToEntity(ApartmentFeatureDto dto) => new()
    {
        ApartmentId = dto.ApartmentId,
        Name = dto.Name,
        NameEn = dto.NameEn,
    };

    private static void UpdateEntity(ApartmentFeature entity, ApartmentFeatureDto dto)
    {
        entity.ApartmentId = dto.ApartmentId;
        entity.Name = dto.Name;
        entity.NameEn = dto.NameEn;
    }
}
