using System.Text.Json.Serialization;

namespace webcompanionapi.DTOs;

public class ApartmentDto
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("titleEn")]
    public string TitleEn { get; set; } = string.Empty;

    [JsonPropertyName("unit_type_name")]
    public string UnitTypeName { get; set; } = string.Empty;

    [JsonPropertyName("bathrooms")]
    public int Bathrooms { get; set; }

    [JsonPropertyName("squareFootage")]
    public int SquareFootage { get; set; }

    [JsonPropertyName("price")]
    public decimal Price { get; set; }

    [JsonPropertyName("area")]
    public string Area { get; set; } = string.Empty;

    [JsonPropertyName("furnished")]
    public bool Furnished { get; set; }

    [JsonPropertyName("roomtorent")]
    public bool RoomToRent { get; set; }

    [JsonPropertyName("condorentals")]
    public bool CondoRentals { get; set; }

    [JsonPropertyName("available")]
    public bool Available { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("descriptionEn")]
    public string DescriptionEn { get; set; } = string.Empty;

    [JsonPropertyName("features")]
    public List<string> Features { get; set; } = [];

    [JsonPropertyName("featuresEn")]
    public List<string> FeaturesEn { get; set; } = [];

    [JsonPropertyName("images")]
    public List<string> Images { get; set; } = [];

    [JsonPropertyName("toggle_names")]
    public List<string> ToggleNames { get; set; } = [];
}

public class AppVersionDto
{
    [JsonPropertyName("version")]
    public string Version { get; set; } = string.Empty;

    [JsonPropertyName("appName")]
    public string AppName { get; set; } = string.Empty;

    [JsonPropertyName("author")]
    public string Author { get; set; } = string.Empty;

    [JsonPropertyName("company")]
    public string Company { get; set; } = string.Empty;

    [JsonPropertyName("copyright")]
    public string Copyright { get; set; } = string.Empty;

    [JsonPropertyName("update date")]
    public string UpdateDate { get; set; } = string.Empty;
}

public class CustomerDto
{
    [JsonPropertyName("customerId")]
    public string CustomerId { get; set; } = string.Empty;

    [JsonPropertyName("customerName")]
    public string CustomerName { get; set; } = string.Empty;

    [JsonPropertyName("customerEmail")]
    public string CustomerEmail { get; set; } = string.Empty;

    [JsonPropertyName("userId")]
    public string UserId { get; set; } = string.Empty;

    [JsonPropertyName("password")]
    public string Password { get; set; } = string.Empty;
}

public class CustomersResponseDto
{
    [JsonPropertyName("customers")]
    public List<CustomerDto> Customers { get; set; } = [];
}

public class PreferencesDto
{
    [JsonPropertyName("googledrive")]
    public string GoogleDrive { get; set; } = string.Empty;
}

public class SeoPageDto
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("pageName")]
    public string PageName { get; set; } = string.Empty;

    [JsonPropertyName("pageUrl")]
    public string PageUrl { get; set; } = string.Empty;

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("metaName")]
    public string MetaName { get; set; } = string.Empty;

    [JsonPropertyName("metaDescription")]
    public string MetaDescription { get; set; } = string.Empty;

    [JsonPropertyName("lastModified")]
    public string? LastModified { get; set; }

    [JsonPropertyName("changeFrequency")]
    public string? ChangeFrequency { get; set; }

    [JsonPropertyName("priority")]
    public double? Priority { get; set; }
}

public class FeatureDto
{
    [JsonPropertyName("toggle_name")]
    public string ToggleName { get; set; } = string.Empty;

    [JsonPropertyName("toggle_image")]
    public string ToggleImage { get; set; } = string.Empty;
}

public class UnitTypeDto
{
    [JsonPropertyName("unit_type_name")]
    public string UnitTypeName { get; set; } = string.Empty;
}
