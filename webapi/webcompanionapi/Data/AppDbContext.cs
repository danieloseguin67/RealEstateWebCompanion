using Microsoft.EntityFrameworkCore;
using webcompanionapi.Models;

namespace webcompanionapi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Apartment> Apartments { get; set; }
    public DbSet<AppVersion> AppVersions { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Preference> Preferences { get; set; }
    public DbSet<SeoPage> SeoPages { get; set; }
    public DbSet<Feature> Features { get; set; }
    public DbSet<UnitType> UnitTypes { get; set; }
    public DbSet<Area> Areas { get; set; }
    public DbSet<ApartmentFeature> ApartmentFeatures { get; set; }
    public DbSet<ApartmentImage> ApartmentImages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Apartment>().ToTable("apartments");
        modelBuilder.Entity<AppVersion>().ToTable("appversion");
        modelBuilder.Entity<Customer>().ToTable("customer");
        modelBuilder.Entity<Preference>().ToTable("preferences");
        modelBuilder.Entity<SeoPage>().ToTable("seo");
        modelBuilder.Entity<Feature>().ToTable("features");
        modelBuilder.Entity<UnitType>().ToTable("unittypes");
        modelBuilder.Entity<Area>().ToTable("areas");
        modelBuilder.Entity<ApartmentFeature>().ToTable("apartment_features");
        modelBuilder.Entity<ApartmentImage>().ToTable("apartment_images");
    }
}
