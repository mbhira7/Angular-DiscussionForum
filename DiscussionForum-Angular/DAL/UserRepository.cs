using System;
using DiscussionForum_Angular.Models;

namespace DiscussionForum_Angular.DAL;

public class UserRepository : IUserRepository
{
    private readonly ForumDbContext _db;
    private readonly ILogger<UserRepository> _logger;

    public UserRepository(ForumDbContext db, ILogger<UserRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    //Used to retrieve a single user from the database by its ID
    public async Task<User?> GetUserById(string id)
    {
        try
        {
            return await _db.Users.FindAsync(id);
        }
        catch (Exception e)
        {
            _logger.LogError("[UserRepository] user FindAsync(id) failed when GetUserById for " +
                "UserId {UserId: 0000}, error message: {e}", e.Message);
            return null;
        }
    }

}

