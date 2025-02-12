using FinanceTrackerApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Transactions;
using FinanceTrackerApi.Models;
using Transaction = FinanceTrackerApi.Models.Transaction;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace FinanceTrackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransactionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Transaction
        [HttpGet("GetTransactions")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions([FromHeader(Name = "Authorization")] string authorization)
        {

            if (string.IsNullOrEmpty(authorization) || !authorization.StartsWith("Bearer "))
            {
                return BadRequest("Invalid or missing token.");
            }

            string token = authorization.Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();

            try
            {
                var jwtToken = handler.ReadJwtToken(token);
                var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;

                if (string.IsNullOrEmpty(userIdClaim))
                {
                    return Unauthorized("UserId not found in token.");
                }
                var transactions = await (from t in _context.Transactions
                                          join c in _context.Categories on t.CategoryId equals c.Id
                                          select new
                                          {
                                              t.Id,
                                              t.Amount,
                                              t.CategoryId,
                                              CategoryName = c.Name, // ✅ Manually get category name
                                              t.Description,
                                              t.IsExpense,
                                              t.Date,
                                              t.UserId
                                          }).ToListAsync();

                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error processing token: {ex.Message}");
            }
        }

        // POST: api/Transaction
        [HttpPost("CreateTransaction")]
        public async Task<ActionResult<Transaction>> CreateTransaction(Transaction transaction)
        {
            ////var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //var userId = User.Identity?.Name;
            //if (string.IsNullOrEmpty(userId))
            //{
            //    return Unauthorized(new { message = "User not authenticated" });
            //}

            //// Assign the logged-in user ID automatically
            //transaction.UserId = userId;
           
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTransactions), new { id = transaction.Id }, transaction);
        }

        // PUT: api/Transaction/{id}
        [HttpPut("{id}/UpdateTransaction")]
        public async Task<IActionResult> UpdateTransaction(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }

            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Transactions.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Transaction/{id}
        [HttpDelete("{id}/DeleteTransaction")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
