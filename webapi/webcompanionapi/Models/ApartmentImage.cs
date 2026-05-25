using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webcompanionapi.Models;

[Table("apartment_images")]
public class ApartmentImage
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string ApartmentId { get; set; } = string.Empty;

    [MaxLength(500)]
    public string FileName { get; set; } = string.Empty;
}
