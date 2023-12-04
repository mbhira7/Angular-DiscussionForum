using Microsoft.EntityFrameworkCore;
using DiscussionForum_Angular.DAL;
using Microsoft.Extensions.Hosting;

namespace DiscussionForum_Angular.Models;

public static class DBInit
{
    //ApplicationsBuilder contains access to the services
    public static void Seed(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        ForumDbContext context = serviceScope.ServiceProvider.GetRequiredService<ForumDbContext>();
        //context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        context.SaveChanges();
    }
}