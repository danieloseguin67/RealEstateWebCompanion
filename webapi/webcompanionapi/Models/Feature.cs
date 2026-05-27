using System.ComponentModel.DataAnnotations;

namespace webcompanionapi.Models;

public class Feature
{
    [Key]
    public int Id { get; set; }

    public string ToggleImage { get; set; } = string.Empty;

    [MaxLength(100)]
    public string FrenchName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string EnglishName { get; set; } = string.Empty;
}
