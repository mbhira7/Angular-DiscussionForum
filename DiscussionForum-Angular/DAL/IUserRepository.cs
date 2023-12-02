using System;
using DiscussionForum_Angular.Models;

namespace DiscussionForum_Angular.DAL;

public interface IUserRepository
{
    Task<User?> GetUserById(string id);
}

