using System.ComponentModel.DataAnnotations;

namespace webcompanionapi.Models;

public class Preference
{
    [Key]
    public int Id { get; set; }

    [MaxLength(100)]
    public string PreferenceKey { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string PreferenceValue { get; set; } = string.Empty;
}
