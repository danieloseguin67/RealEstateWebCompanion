using System.ComponentModel.DataAnnotations;

namespace webcompanionapi.Models;

public class Area
{
    [Key]
    [MaxLength(100)]
    public string Id { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(200)]
    public string NameFr { get; set; } = string.Empty;

    [MaxLength(200)]
    public string NameEn { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(500)]
    public string DescriptionEn { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Link { get; set; } = string.Empty;
}
