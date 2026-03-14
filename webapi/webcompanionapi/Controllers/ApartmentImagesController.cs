using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApartmentImagesController : ControllerBase
{
    private readonly AppDbContext _db;

    public ApartmentImagesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ApartmentImageDto>>> GetAll()
    {
        var images = await _db.ApartmentImages.ToListAsync();
        return Ok(images.Select(MapToDto));
    }

    [HttpGet("apartment/{apartmentId}")]
    public async Task<ActionResult<IEnumerable<ApartmentImageDto>>> GetByApartmentId(string apartmentId)
    {
        var images = await _db.ApartmentImages
            .Where(i => i.ApartmentId == apartmentId)
            .ToListAsync();

        return Ok(images.Select(MapToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApartmentImageDto>> GetById(int id)
    {
        var image = await _db.ApartmentImages.FindAsync(id);
        if (image == null) return NotFound();
        return Ok(MapToDto(image));
    }

    [HttpPost]
    public async Task<ActionResult<ApartmentImageDto>> Create(ApartmentImageDto dto)
    {
        var entity = MapToEntity(dto);
        _db.ApartmentImages.Add(entity);
        await _db.SaveChangesAsync();

        await SyncApartmentImagesJson(entity.ApartmentId);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, MapToDto(entity));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ApartmentImageDto dto)
    {
        var entity = await _db.ApartmentImages.FindAsync(id);
        if (entity == null) return NotFound();

        entity.ApartmentId = dto.ApartmentId;
        entity.FileName = dto.FileName;

        await _db.SaveChangesAsync();

        await SyncApartmentImagesJson(entity.ApartmentId);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.ApartmentImages.FindAsync(id);
        if (entity == null) return NotFound();

        var apartmentId = entity.ApartmentId;
        _db.ApartmentImages.Remove(entity);
        await _db.SaveChangesAsync();

        await SyncApartmentImagesJson(apartmentId);
        return NoContent();
    }

    private async Task SyncApartmentImagesJson(string apartmentId)
    {
        var apartment = await _db.Apartments.FindAsync(apartmentId);
        if (apartment == null) return;

        var fileNames = await _db.ApartmentImages
            .Where(i => i.ApartmentId == apartmentId)
            .OrderBy(i => i.Id)
            .Select(i => i.FileName)
            .ToListAsync();

        apartment.ImagesJson = JsonSerializer.Serialize(fileNames);
        await _db.SaveChangesAsync();
    }

    private static ApartmentImageDto MapToDto(ApartmentImage i) => new()
    {
        Id = i.Id,
        ApartmentId = i.ApartmentId,
        FileName = i.FileName,
    };

    private static ApartmentImage MapToEntity(ApartmentImageDto dto) => new()
    {
        ApartmentId = dto.ApartmentId,
        FileName = dto.FileName,
    };
}
