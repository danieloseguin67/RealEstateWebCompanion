using System.ComponentModel.DataAnnotations;

namespace webcompanionapi.Models;

public class Feature
{
    [Key]
    public int Id { get; set; }

    [MaxLength(100)]
    public string ToggleName { get; set; } = string.Empty;

    [MaxLength(10)]
    public string ToggleImage { get; set; } = string.Empty;
}
