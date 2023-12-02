using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DiscussionForum_Angular.DAL;
using DiscussionForum_Angular.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscussionForum_Angular.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReplyController : Controller
{
    private readonly IReplyRepository _replyRepository;
    private readonly ILogger<ReplyController> _logger;

    public ReplyController(IReplyRepository replyRepository, ILogger<ReplyController> logger)
    {
        _replyRepository = replyRepository;
        _logger = logger;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Reply newReply)
    {
        if (newReply== null)
        {
            return BadRequest("Invalid reply data");
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        newReply.Id = userId;

        bool returnOk = await _replyRepository.Create(newReply);

        if (returnOk)
        {
            var response = new { success = true, message = "Reply" + newReply.ReplyId + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Reply creation failed", reply = newReply };
            return Ok(response);
        }
    }
}

