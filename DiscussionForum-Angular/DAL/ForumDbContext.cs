using System;
using DiscussionForum_Angular.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DiscussionForum_Angular.DAL;

public class ForumDbContext : IdentityDbContext<User>
{
    public ForumDbContext(DbContextOptions<ForumDbContext> options) : base(options)
    {
        //Database.EnsureCreated();
    }

    public DbSet<Question> Questions { get; set; }
    public DbSet<User> ForumUsers { get; set; }
    public DbSet<Reply> Replies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
    }


}