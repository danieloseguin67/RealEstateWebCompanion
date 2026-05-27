using System.ComponentModel.DataAnnotations;

namespace webcompanionapi.Models;

public class Area
{
    [Key]
    public int Id { get; set; }

    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(200)]
    public string NameFr { get; set; } = string.Empty;

    [MaxLength(200)]
    public string NameEn { get; set; } = string.Empty;

    [MaxLength(500)]
    public string DescriptionFr { get; set; } = string.Empty;

    [MaxLength(500)]
    public string DescriptionEn { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Link { get; set; } = string.Empty;
}
