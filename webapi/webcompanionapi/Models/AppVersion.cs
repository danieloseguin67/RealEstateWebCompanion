using System.ComponentModel.DataAnnotations;

namespace webcompanionapi.Models;

public class AppVersion
{
    [Key]
    public int Id { get; set; }

    [MaxLength(50)]
    public string Version { get; set; } = string.Empty;

    [MaxLength(200)]
    public string AppName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Author { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Company { get; set; } = string.Empty;

    [MaxLength(20)]
    public string Copyright { get; set; } = string.Empty;

    [MaxLength(50)]
    public string UpdateDate { get; set; } = string.Empty;
}
