using System.ComponentModel.DataAnnotations;

namespace webcompanionapi.Models;

public class Customer
{
    [Key]
    [MaxLength(50)]
    public string CustomerId { get; set; } = string.Empty;

    [MaxLength(200)]
    public string CustomerName { get; set; } = string.Empty;

    [MaxLength(200)]
    public string CustomerEmail { get; set; } = string.Empty;

    [MaxLength(100)]
    public string UserId { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Password { get; set; } = string.Empty;
}
