using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webcompanionapi.Data;
using webcompanionapi.DTOs;
using webcompanionapi.Models;

namespace webcompanionapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly AppDbContext _db;

    public CustomerController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<CustomersResponseDto>> GetAll()
    {
        var customers = await _db.Customers.ToListAsync();
        return Ok(new CustomersResponseDto
        {
            Customers = customers.Select(MapToDto).ToList()
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CustomerDto>> GetById(string id)
    {
        var customer = await _db.Customers.FindAsync(id);
        if (customer == null) return NotFound();
        return Ok(MapToDto(customer));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerDto>> Create(CustomerDto dto)
    {
        if (await _db.Customers.AnyAsync(c => c.CustomerId == dto.CustomerId))
            return Conflict($"Customer with id '{dto.CustomerId}' already exists.");

        var entity = MapToEntity(dto);
        _db.Customers.Add(entity);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.CustomerId }, MapToDto(entity));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, CustomerDto dto)
    {
        if (id != dto.CustomerId) return BadRequest();
        var entity = await _db.Customers.FindAsync(id);
        if (entity == null) return NotFound();

        entity.CustomerName = dto.CustomerName;
        entity.CustomerEmail = dto.CustomerEmail;
        entity.UserId = dto.UserId;
        entity.Password = dto.Password;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var entity = await _db.Customers.FindAsync(id);
        if (entity == null) return NotFound();
        _db.Customers.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static CustomerDto MapToDto(Customer c) => new()
    {
        CustomerId = c.CustomerId,
        CustomerName = c.CustomerName,
        CustomerEmail = c.CustomerEmail,
        UserId = c.UserId,
        Password = c.Password,
    };

    private static Customer MapToEntity(CustomerDto dto) => new()
    {
        CustomerId = dto.CustomerId,
        CustomerName = dto.CustomerName,
        CustomerEmail = dto.CustomerEmail,
        UserId = dto.UserId,
        Password = dto.Password,
    };
}
