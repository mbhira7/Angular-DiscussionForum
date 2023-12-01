using System;
using System.Collections.Generic;
using System.Linq;
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
    private readonly IPasswordHasher<User> _passwordHasher;

    public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IPasswordHasher<User> passwordHasher)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _passwordHasher = passwordHasher;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserRegister logInUser)
    {
        var user = await _userManager.FindByNameAsync(logInUser.UserName);

        if (user == null)
        {
            return BadRequest("Invalid username or password");
        }

        var result = await _signInManager.PasswordSignInAsync(user, logInUser.Password, isPersistent: false, lockoutOnFailure: false);

        if (result.Succeeded)
        {
            var response = new { success = true, message = "User " + logInUser.UserName + " logged in successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Log in failed" };
            return Ok(response);
        }

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegister newUser)
    {
        var user = new User
        {
            UserName = newUser.UserName,
        };

        var result = await _userManager.CreateAsync(user, newUser.Password);

        if (result.Succeeded)
        {
            var response = new { success = true, message = "User " + newUser.UserName + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "User creation failed" };
            return Ok(response);
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok("Logout successful");
    }
}

