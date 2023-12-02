using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiscussionForum_Angular.DAL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscussionForum_Angular.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserController> _logger;

    public UserController(IUserRepository userRepository, ILogger<UserController> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetUserById(string id)
    {
        var user = await _userRepository.GetUserById(id);

        if (user == null)
        {
            _logger.LogError("[UserController] User not found while executing _userRepository.GetUserById(id)");
            return NotFound("User not found");
        }

        return Ok(user);
    }
}

