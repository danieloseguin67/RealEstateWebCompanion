using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webcompanionapi.Models;

public class ApartmentImage
{
    [Key]
    public int Id { get; set; }

    [MaxLength(50)]
    public string ApartmentId { get; set; } = string.Empty;

    [MaxLength(500)]
    public string FileName { get; set; } = string.Empty;

    [ForeignKey(nameof(ApartmentId))]
    public Apartment? Apartment { get; set; }
}
