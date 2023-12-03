using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DiscussionForum_Angular.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscussionForum_Angular.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : Controller
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ILogger<AuthController> _logger;

    public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, ILogger<AuthController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserRegister logInUser)
    {
        // Finds the user by the provided username
        var user = await _userManager.FindByNameAsync(logInUser.UserName);

        if (user == null)
        {
            _logger.LogError("[AuthController] User not found");
            return BadRequest("Invalid log in credentials");
        }

        // Attempts to sign in the user with the provided password
        var result = await _signInManager.PasswordSignInAsync(user, logInUser.Password, isPersistent: false, lockoutOnFailure: false);

        // If sign-in is successful, return a success response
        if (result.Succeeded)
        {
            var response = new { success = true, message = "User " + logInUser.UserName + " logged in successfully", username = logInUser.UserName };
            return Ok(response);
        }
        else
        {
            // If sign-in fails, return a failure response
            var response = new { success = false, message = "Log in failed" };
            return Ok(response);
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegister newUser)
    {
        if (newUser == null)
        {
            _logger.LogError("[AuthController] User could not be registered");
            return BadRequest("Invalid registration data");
        }

        // Creates a new User instance with the provided username
        var user = new User
        {
            UserName = newUser.UserName,
        };

        // Attempts to create the user in the system using UserManager
        var result = await _userManager.CreateAsync(user, newUser.Password);

        // If creation succeeded, constructs a success response
        if (result.Succeeded)
        {
            var response = new { success = true, message = "User " + newUser.UserName + " created successfully" };
            return Ok(response);
        }

        // Constructs a failure response
        else
        {
            var response = new { success = false, message = "User creation failed" };
            return Ok(response);
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        try
        {
            // Signs the user out 
            await _signInManager.SignOutAsync();

            // Construct a success response indicating successful user logout
            var response = new { success = true, message = "User logged out successfully" };

            // Return a 200 OK response with the success message
            return Ok(response);
        }

        catch
        {
            _logger.LogError("[AuthController] User log out failed");

            // Constructs an error response indicating a logout failure
            var errorResponse = new { success = false, message = "Failed to log out user" };

            // Return a server error response with the error message
            return StatusCode(500, errorResponse); // Return a 500 Internal Server Error status code with the error message
        }
    }
}

