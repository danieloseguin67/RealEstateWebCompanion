using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;
using webcompanionapi.Data;

namespace webcompanionapi.Controllers;

public class ApartmentImageDto
{
    [JsonPropertyName("apartmentId")]
    public string ApartmentId { get; set; } = string.Empty;

    [JsonPropertyName("fileName")]
    public string FileName { get; set; } = string.Empty;
}

[ApiController]
[Route("api/[controller]")]
public class ApartmentImagesController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly string _imagesPath;

    private static readonly string[] AllowedExtensions =
        [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"];

    public ApartmentImagesController(AppDbContext db, IConfiguration configuration)
    {
        _db = db;
        _imagesPath = configuration["ImagesPhysicalPath"] ?? string.Empty;
    }

    // GET api/ApartmentImages/apartment/{apartmentId}
    [HttpGet("apartment/{apartmentId}")]
    public async Task<ActionResult<IEnumerable<ApartmentImageDto>>> GetByApartment(string apartmentId)
    {
        var apartment = await _db.Apartments
            .Where(a => a.Id == apartmentId)
            .Select(a => new { a.Id, a.ImagesJson })
            .FirstOrDefaultAsync();

        if (apartment == null)
            return NotFound();

        return Ok(ParseJsonList(apartment.ImagesJson)
            .Select(fileName => new ApartmentImageDto
            {
                ApartmentId = apartment.Id,
                FileName = fileName
            }));
    }

    // POST api/ApartmentImages  — register a filename (no physical upload)
    [HttpPost]
    public async Task<ActionResult<ApartmentImageDto>> Create([FromBody] ApartmentImageDto dto)
    {
        var apartment = await _db.Apartments.FindAsync(dto.ApartmentId);
        if (apartment == null) return NotFound();

        var images = ParseJsonList(apartment.ImagesJson);
        if (!images.Contains(dto.FileName))
        {
            images.Add(dto.FileName);
            apartment.ImagesJson = JsonSerializer.Serialize(images);
            await _db.SaveChangesAsync();
        }

        return Ok(dto);
    }

    // POST api/ApartmentImages/upload/{apartmentId}  — multipart file upload
    [HttpPost("upload/{apartmentId}")]
    public async Task<ActionResult<IEnumerable<ApartmentImageDto>>> Upload(
        string apartmentId,
        [FromForm] IFormFileCollection files)
    {
        if (files == null || files.Count == 0)
            return BadRequest("No files provided.");

        if (string.IsNullOrWhiteSpace(_imagesPath))
            return StatusCode(500, "ImagesPhysicalPath is not configured.");

        var apartment = await _db.Apartments.FindAsync(apartmentId);
        if (apartment == null) return NotFound();

        Directory.CreateDirectory(_imagesPath);

        var images = ParseJsonList(apartment.ImagesJson);
        var added = new List<ApartmentImageDto>();

        foreach (var file in files)
        {
            if (file.Length == 0) continue;

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(ext))
                return BadRequest($"File type '{ext}' is not allowed.");

            // Sanitize the filename — keep only the file name portion, no path traversal
            var safeFileName = Path.GetFileName(file.FileName);
            if (string.IsNullOrWhiteSpace(safeFileName))
                continue;

            var destPath = Path.Combine(_imagesPath, safeFileName);
            using (var stream = new FileStream(destPath, FileMode.Create, FileAccess.Write))
            {
                await file.CopyToAsync(stream);
            }

            if (!images.Contains(safeFileName))
                images.Add(safeFileName);

            added.Add(new ApartmentImageDto { ApartmentId = apartmentId, FileName = safeFileName });
        }

        apartment.ImagesJson = JsonSerializer.Serialize(images);
        await _db.SaveChangesAsync();

        return Ok(added);
    }

    // PUT api/ApartmentImages/{apartmentId}  — replace the full images list for an apartment
    [HttpPut("{apartmentId}")]
    public async Task<IActionResult> Update(string apartmentId, [FromBody] List<string> fileNames)
    {
        var apartment = await _db.Apartments.FindAsync(apartmentId);
        if (apartment == null) return NotFound();

        apartment.ImagesJson = JsonSerializer.Serialize(fileNames);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE api/ApartmentImages/{apartmentId}/{fileName}  — remove a specific image
    [HttpDelete("{apartmentId}/{fileName}")]
    public async Task<IActionResult> Delete(string apartmentId, string fileName)
    {
        var apartment = await _db.Apartments.FindAsync(apartmentId);
        if (apartment == null) return NotFound();

        var images = ParseJsonList(apartment.ImagesJson);
        if (!images.Remove(fileName))
            return NotFound();

        if (!string.IsNullOrWhiteSpace(_imagesPath))
        {
            var filePath = Path.Combine(_imagesPath, fileName);
            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);
        }

        apartment.ImagesJson = JsonSerializer.Serialize(images);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static List<string> ParseJsonList(string json)
    {
        try { return JsonSerializer.Deserialize<List<string>>(json) ?? []; }
        catch { return []; }
    }
}
