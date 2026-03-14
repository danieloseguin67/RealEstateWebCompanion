using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webcompanionapi.Models;

public class Apartment
{
    [Key]
    [MaxLength(50)]
    public string Id { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string TitleEn { get; set; } = string.Empty;

    [MaxLength(100)]
    public string UnitTypeName { get; set; } = string.Empty;

    public int Bathrooms { get; set; }

    public int SquareFootage { get; set; }

    public decimal Price { get; set; }

    [MaxLength(100)]
    public string Area { get; set; } = string.Empty;

    public bool Furnished { get; set; }

    public bool RoomToRent { get; set; }

    public bool CondoRentals { get; set; }

    public bool Available { get; set; }

    [Column(TypeName = "nvarchar(max)")]
    public string Description { get; set; } = string.Empty;

    [Column(TypeName = "nvarchar(max)")]
    public string DescriptionEn { get; set; } = string.Empty;

    /// <summary>JSON-serialized string array of French features</summary>
    [Column(TypeName = "nvarchar(max)")]
    public string FeaturesJson { get; set; } = "[]";

    /// <summary>JSON-serialized string array of English features</summary>
    [Column(TypeName = "nvarchar(max)")]
    public string FeaturesEnJson { get; set; } = "[]";

    /// <summary>JSON-serialized string array of image filenames</summary>
    [Column(TypeName = "nvarchar(max)")]
    public string ImagesJson { get; set; } = "[]";

    /// <summary>JSON-serialized string array of toggle names</summary>
    [Column(TypeName = "nvarchar(max)")]
    public string ToggleNamesJson { get; set; } = "[]";
}
