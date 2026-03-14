using System.ComponentModel.DataAnnotations;

namespace webcompanionapi.Models;

public class SeoPage
{
    [Key]
    [MaxLength(100)]
    public string Id { get; set; } = string.Empty;

    [MaxLength(200)]
    public string PageName { get; set; } = string.Empty;

    [MaxLength(300)]
    public string PageUrl { get; set; } = string.Empty;

    [MaxLength(300)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(100)]
    public string MetaName { get; set; } = string.Empty;

    [MaxLength(500)]
    public string MetaDescription { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? LastModified { get; set; }

    [MaxLength(20)]
    public string? ChangeFrequency { get; set; }

    public double? Priority { get; set; }
}
