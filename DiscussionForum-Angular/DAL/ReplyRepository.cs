using System;
using DiscussionForum_Angular.Models;

namespace DiscussionForum_Angular.DAL;

public class ReplyRepository : IReplyRepository
{
    private readonly ForumDbContext _db;
    private readonly ILogger<ReplyRepository> _logger;

    public ReplyRepository(ForumDbContext db, ILogger<ReplyRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<bool> Create(Reply reply)
    {
        try
        {
            _db.Replies.Add(reply);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[ReplyRepository] reply creation failed for reply {@reply}, error message:" +
                "{e}", reply, e.Message);
            return false;
        }
    }
}

