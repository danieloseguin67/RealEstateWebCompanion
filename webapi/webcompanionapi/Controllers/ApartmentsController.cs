using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApartmentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ApartmentsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ApartmentDto>>> GetAll()
    {
        var apartments = await _db.Apartments.ToListAsync();
        return Ok(apartments.Select(MapToDto));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApartmentDto>> GetById(string id)
    {
        var apartment = await _db.Apartments.FindAsync(id);
        if (apartment == null) return NotFound();
        return Ok(MapToDto(apartment));
    }

    [HttpPost]
    public async Task<ActionResult<ApartmentDto>> Create(ApartmentDto dto)
    {
        if (await _db.Apartments.AnyAsync(a => a.Id == dto.Id))
            return Conflict($"Apartment with id '{dto.Id}' already exists.");

        var entity = MapToEntity(dto);
        _db.Apartments.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, MapToDto(entity));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, ApartmentDto dto)
    {
        if (id != dto.Id) return BadRequest();
        var entity = await _db.Apartments.FindAsync(id);
        if (entity == null) return NotFound();

        UpdateEntity(entity, dto);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var entity = await _db.Apartments.FindAsync(id);
        if (entity == null) return NotFound();
        _db.Apartments.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static ApartmentDto MapToDto(Apartment a) => new()
    {
        Id = a.Id,
        Title = a.Title,
        TitleEn = a.TitleEn,
        UnitTypeName = a.UnitTypeName,
        Bathrooms = a.Bathrooms,
        SquareFootage = a.SquareFootage,
        Price = a.Price,
        Area = a.Area,
        Furnished = a.Furnished,
        RoomToRent = a.RoomToRent,
        CondoRentals = a.CondoRentals,
        Available = a.Available,
        Description = a.Description,
        DescriptionEn = a.DescriptionEn,
        FeatureIds = ParseIntList(a.FeaturesJson),
        Images = ParseStringList(a.ImagesJson),
    };

    /// <summary>
    /// Deserializes a JSON array of integers (or numeric strings) into a List&lt;int&gt;.
    /// Returns an empty list on null, empty, or invalid JSON.
    /// </summary>
    private static List<int> ParseIntList(string? json)
    {
        if (string.IsNullOrWhiteSpace(json)) return [];
        try
        {
            using var doc = JsonDocument.Parse(json);
            var result = new List<int>();
            foreach (var e in doc.RootElement.EnumerateArray())
            {
                if (e.ValueKind == JsonValueKind.Number && e.TryGetInt32(out var n))
                    result.Add(n);
                else if (e.ValueKind == JsonValueKind.String && int.TryParse(e.GetString(), out var s))
                    result.Add(s);
            }
            return result;
        }
        catch
        {
            return [];
        }
    }

    /// <summary>
    /// Deserializes a JSON array that may contain strings or numbers into a List&lt;string&gt;.
    /// Numbers are converted via ToString(). Returns an empty list on null, empty, or invalid JSON.
    /// </summary>
    private static List<string> ParseStringList(string? json)
    {
        if (string.IsNullOrWhiteSpace(json)) return [];
        try
        {
            using var doc = JsonDocument.Parse(json);
            return doc.RootElement.EnumerateArray()
                .Select(e => e.ValueKind == JsonValueKind.String ? e.GetString()! : e.GetRawText())
                .ToList();
        }
        catch
        {
            return [];
        }
    }

    private static Apartment MapToEntity(ApartmentDto dto) => new()
    {
        Id = dto.Id,
        Title = dto.Title,
        TitleEn = dto.TitleEn,
        UnitTypeName = dto.UnitTypeName,
        Bathrooms = dto.Bathrooms,
        SquareFootage = dto.SquareFootage,
        Price = dto.Price,
        Area = dto.Area,
        Furnished = dto.Furnished,
        RoomToRent = dto.RoomToRent,
        CondoRentals = dto.CondoRentals,
        Available = dto.Available,
        Description = dto.Description,
        DescriptionEn = dto.DescriptionEn,
        FeaturesJson = JsonSerializer.Serialize(dto.FeatureIds),
        ImagesJson = JsonSerializer.Serialize(dto.Images),
    };

    private static void UpdateEntity(Apartment entity, ApartmentDto dto)
    {
        entity.Title = dto.Title;
        entity.TitleEn = dto.TitleEn;
        entity.UnitTypeName = dto.UnitTypeName;
        entity.Bathrooms = dto.Bathrooms;
        entity.SquareFootage = dto.SquareFootage;
        entity.Price = dto.Price;
        entity.Area = dto.Area;
        entity.Furnished = dto.Furnished;
        entity.RoomToRent = dto.RoomToRent;
        entity.CondoRentals = dto.CondoRentals;
        entity.Available = dto.Available;
        entity.Description = dto.Description;
        entity.DescriptionEn = dto.DescriptionEn;
        entity.FeaturesJson = JsonSerializer.Serialize(dto.FeatureIds);
        entity.ImagesJson = JsonSerializer.Serialize(dto.Images);
    }
}
