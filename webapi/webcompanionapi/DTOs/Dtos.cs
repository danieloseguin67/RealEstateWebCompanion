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

    [JsonPropertyName("feature_ids")]
    public List<int> FeatureIds { get; set; } = [];

    [JsonPropertyName("images")]
    public List<string> Images { get; set; } = [];
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
    [JsonPropertyName("area_link")]
    public string AreaLink { get; set; } = string.Empty;

    [JsonPropertyName("phone_number")]
    public string PhoneNumber { get; set; } = string.Empty;

    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

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
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("toggle_image")]
    public string ToggleImage { get; set; } = string.Empty;

    [JsonPropertyName("french_name")]
    public string FrenchName { get; set; } = string.Empty;

    [JsonPropertyName("english_name")]
    public string EnglishName { get; set; } = string.Empty;
}

public class UnitTypeDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("unitTypeNameEn")]
    public string UnitTypeNameEn { get; set; } = string.Empty;

    [JsonPropertyName("unitTypeNameFr")]
    public string UnitTypeNameFr { get; set; } = string.Empty;
}

public class AreaDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("nameFr")]
    public string NameFr { get; set; } = string.Empty;

    [JsonPropertyName("nameEn")]
    public string NameEn { get; set; } = string.Empty;

    [JsonPropertyName("descriptionFr")]
    public string DescriptionFr { get; set; } = string.Empty;

    [JsonPropertyName("descriptionEn")]
    public string DescriptionEn { get; set; } = string.Empty;

    [JsonPropertyName("link")]
    public string Link { get; set; } = string.Empty;
}

