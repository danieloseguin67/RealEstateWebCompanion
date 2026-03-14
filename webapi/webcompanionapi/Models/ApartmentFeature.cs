using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webcompanionapi.Models;

public class ApartmentFeature
{
    [Key]
    public int Id { get; set; }

    [MaxLength(50)]
    public string ApartmentId { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(200)]
    public string NameEn { get; set; } = string.Empty;

    [ForeignKey(nameof(ApartmentId))]
    public Apartment? Apartment { get; set; }
}
