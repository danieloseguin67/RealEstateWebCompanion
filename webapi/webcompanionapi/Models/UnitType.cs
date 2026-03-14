using System.ComponentModel.DataAnnotations;

namespace webcompanionapi.Models;

public class UnitType
{
    [Key]
    public int Id { get; set; }

    [MaxLength(100)]
    public string UnitTypeName { get; set; } = string.Empty;
}
