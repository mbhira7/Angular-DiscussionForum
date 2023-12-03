using System;
using Microsoft.EntityFrameworkCore;
using DiscussionForum_Angular.Models;

namespace DiscussionForum_Angular.DAL;

public class QuestionRepository : IQuestionRepository
{
    private readonly ForumDbContext _db;
    private readonly ILogger<QuestionRepository> _logger;

    public QuestionRepository(ForumDbContext db, ILogger<QuestionRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    //Used to retrieve a list of all the questions from the database
    public async Task<IEnumerable<Question>?> GetAll()
    {
        try
        {
            return await _db.Questions.ToListAsync();
        }
        catch (Exception e)
        {
            _logger.LogError("[QuestionRepository] questions ToListAsync() failed when GetAll(), error" +
                "message: {e}", e.Message);
            return null;
        }
    }

    //Used to retrieve a single question from the database by its ID
    public async Task<Question?> GetQuestionById(int id)
    {
        try
        {
            return await _db.Questions.FindAsync(id);
        }
        catch (Exception e)
        {
            _logger.LogError("[QuestionRepository] question FirstOrDefaultAsync failed when GetQuestionById for " +
                "QuestionId {QuestionId: 0000}, error message: {e}", e.Message);
            return null;
        }
    }

    //Used to retrieve a list of questions based on the provided user ID
    public async Task<IEnumerable<Question>?> GetQuestionsByUserId(string id)
    {
        try
        {
            return await _db.Questions.Where(question => question.Id == id).ToListAsync();
        }
        catch (Exception e)
        {
            _logger.LogError("[QuestionRepository] question ToListAsync() failed when GetQuestionsByUserId for " +
                "Id {Id: 0000}, error message: {e}", e.Message);
            return null;
        }
    }

    //Deletes a question based on it's ID and returns a boolean indicating the success of the deletion
    public async Task<bool> Delete(int id)
    {
        try
        {
            var question = await _db.Questions.FindAsync(id);
            if (question == null)
            {
                _logger.LogError("[QuestionRepository] question not found for the QuestionId {QuestionId:0000}", id);
                return false;
            }

            _db.Questions.Remove(question);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[QuestionRepository] question deletion failed for the QuestionId {QuestionId: 0000}" +
                ", error message: {e}", id, e.Message);
            return false;
        }
    }

    //Updates a question based on the provided question data and returns a boolean indicating the success of the update
    public async Task<bool> Update(Question question)
    {
        try {
            _db.Questions.Update(question);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e) {
            _logger.LogError("[QuestionRepository] question SaveChangesAsync() failed when updating the QuestionId" +
                "{QuestionId: 0000}, error message {e}", question, e.Message);
            return false;
        }
    }

    //Creates a question based on the provided question data and returns a boolean indicating the success of the creation
    public async Task<bool> Create(Question question)
    {
        try
        {
            _db.Questions.Add(question);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[QuestionRepository] question creation failed for question {@question}, " +
                "error message: {e}", question, e.Message);
            return false;
        }
    }
}

