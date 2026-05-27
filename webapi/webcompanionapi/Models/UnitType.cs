using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webcompanionapi.Models;

public class UnitType
{
    [Key]
    public int Id { get; set; }

    [Column("UnitTypeNameEn")]
    [MaxLength(200)]
    public string UnitTypeNameEn { get; set; } = string.Empty;

    [Column("UnitTypeNameFr")]
    [MaxLength(200)]
    public string UnitTypeNameFr { get; set; } = string.Empty;
}
