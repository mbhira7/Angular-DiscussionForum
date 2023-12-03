using System;
using DiscussionForum_Angular.Models;

namespace DiscussionForum_Angular.DAL;

public interface IReplyRepository
{
    Task<bool> Create(Reply reply);
    Task<bool> Update(Reply reply);
}

