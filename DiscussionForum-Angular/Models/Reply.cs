using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace DiscussionForum_Angular.Models;

public class Reply
{
    [Key]
    public int ReplyId { get; set; }

    [Display(Name = "Reply")]
    public string Content { get; set; } = string.Empty;

    public DateTime Created { get; set; } = DateTime.Now;
    public int QuestionId { get; set; }

    [ForeignKey("User")]
    public string Id { get; set; } = string.Empty;

    public virtual User? User { get; set; } = default!;
}

