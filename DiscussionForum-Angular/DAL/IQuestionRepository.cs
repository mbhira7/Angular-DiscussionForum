using System;
using DiscussionForum_Angular.Models;

namespace DiscussionForum_Angular.DAL;

public interface IQuestionRepository
{
    Task<IEnumerable<Question>?> GetAll();
    Task<Question?> GetQuestionById(int id);
    Task<IEnumerable<Question>?> GetQuestionsByUserId(string id);
    Task<bool> Create(Question question);
    Task <bool>Update(Question question);
    Task<bool> Delete(int id);
}