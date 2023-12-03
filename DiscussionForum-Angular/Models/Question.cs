using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionForum_Angular.Models;

public class Question
{

    [Key]
    public int QuestionId { get; set; }

    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime Created { get; set; } = DateTime.Now;

    [ForeignKey("User")]
    public string Id { get; set; } = string.Empty;

    public virtual List<Reply>? Replies { get; set; }
    public virtual User? User { get; set; } = default!;
}

