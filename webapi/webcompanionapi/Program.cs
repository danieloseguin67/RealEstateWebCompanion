using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;

var builder = WebApplication.CreateBuilder(args);

var runningInContainer = string.Equals(
    Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER"),
    "true",
    StringComparison.OrdinalIgnoreCase);

var enableHttpsRedirection = builder.Configuration.GetValue("EnableHttpsRedirection", !runningInContainer);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Real Estate Web Companion API",
        Version = "v1",
        Description = "REST API for Real Estate Web Companion application",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "SeguinDev",
            Email = "daniel@seguin.dev"
        }
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "";
var dbUser     = Environment.GetEnvironmentVariable("DB_USER");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
if (!string.IsNullOrEmpty(dbUser) || !string.IsNullOrEmpty(dbPassword))
{
    var csb = new Microsoft.Data.SqlClient.SqlConnectionStringBuilder(connectionString);
    if (!string.IsNullOrEmpty(dbUser))
    {
        csb.IntegratedSecurity = false;
        csb.UserID = dbUser;
    }
    if (!string.IsNullOrEmpty(dbPassword))
        csb.Password = dbPassword;
    connectionString = csb.ConnectionString;
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

var allowedOrigins = builder.Configuration.GetSection("AllowedCorsOrigins").Get<string[]>();

builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        if (builder.Environment.IsDevelopment() || allowedOrigins == null || allowedOrigins.Length == 0)
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
        else
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Real Estate Web Companion API v1");
    options.RoutePrefix = "swagger";
});

app.UseCors();

if (enableHttpsRedirection)
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
