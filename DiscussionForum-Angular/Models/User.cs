﻿using System;
using Microsoft.AspNetCore.Identity;

namespace DiscussionForum_Angular.Models;

public class User : IdentityUser
{
    public DateTime Created { get; set; } = DateTime.Now;
    public string? ImageUrl { get; set; }
}
