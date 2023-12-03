using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DiscussionForum_Angular.Models;
using DiscussionForum_Angular.DAL;
using System.Security.Claims;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscussionForum_Angular.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionController : Controller
{
    private readonly IQuestionRepository _questionRepository;
    private readonly ILogger<QuestionController> _logger;

    public QuestionController(IQuestionRepository questionRepository, ILogger<QuestionController> logger)
    {
        _questionRepository = questionRepository;
        _logger = logger;
    }


    [HttpGet]
    public async Task<IActionResult> GetAllQuestions()
    {
        var questions = await _questionRepository.GetAll();

        if(questions == null)
        {
            _logger.LogError("[QuestionController] Question list not found while executing _questionRepository.GetAll()");
            return NotFound("Question list not found");
        }

        return Ok(questions);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuestionById(int id)
    {
        var question = await _questionRepository.GetQuestionById(id);

        if (question == null)
        {
            _logger.LogError("[QuestionController] Question not found for the QuestionId {QuestionId: 0000}", id);
            return NotFound("Question not found for the QuestionId");
        }

        return Ok(question);
    }

    [HttpGet("user")]
    public async Task<IActionResult> GetQuestionsByUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var questions = await _questionRepository.GetQuestionsByUserId(userId);

        if (questions == null)
        {
            _logger.LogError("[QuestionController] Question list for user not found while executing _questionRepository.GetQuestionsByUserId(userId)");
            return NotFound("Question list not found");
        }

        return Ok(questions);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Question newQuestion)
    {
        if (newQuestion == null)
        {
            return BadRequest("Invalid question data");
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        newQuestion.Id = userId;

        bool returnOk = await _questionRepository.Create(newQuestion);

        if(returnOk)
        {
            var response = new { success = true, message = "Question " + newQuestion.Title + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Question creation failed" };
            return Ok(response);
        }
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Question newQuestion)
    {
        if (newQuestion == null)
        {
            return BadRequest("Invalid question data.");
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        newQuestion.Id = userId;

        bool returnOk = await _questionRepository.Update(newQuestion);
        if (returnOk)
        {
            var response = new { success = true, message = "Question " + newQuestion.Title + " updated successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Question creation failed" };
            return Ok(response);
        }
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool returnOk = await _questionRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[QuestionController] Question deletion failed for the question {QuestionId:0000}", id);
            return BadRequest("Question deletion failed");
        }
        var response = new { success = true, message = "Question " + id.ToString() + " deleted successfully" };
        return Ok(response);
    }
}

