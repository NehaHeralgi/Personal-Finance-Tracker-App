using FinanceTrackerApi.Data;
using FinanceTrackerApi.Helpers;
using FinanceTrackerApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTrackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JwtHelper _jwtHelper;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, JwtHelper jwtHelper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = _jwtHelper.GenerateJwtToken(user);
                return Ok(new { Token = token });
            }
            return Unauthorized("Invalid login attempt");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (await _userManager.FindByEmailAsync(model.Email) != null)
            {
                return BadRequest(new { message = "Email already in use" });
            }

            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Registration failed", errors = result.Errors });
            }

            // Generate JWT token for the new user
            var token = _jwtHelper.GenerateJwtToken(user);
            return Ok(new { token });
        }

    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

