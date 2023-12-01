using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DiscussionForum_Angular.Models;
using DiscussionForum_Angular.DAL;

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

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Question newQuestion)
    {
        if (newQuestion == null)
        {
            return BadRequest("Invalid question data");
        }

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
}

