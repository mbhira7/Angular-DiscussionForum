using System;
using System.Text.Json.Serialization;

namespace DiscussionForum_Angular.Models;

public class Question
{

    [JsonPropertyName("QuestionId")]
    public int QuestionId { get; set; }

    [JsonPropertyName("Title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("Content")]
    public string Content { get; set; } = string.Empty;

    [JsonPropertyName("Created")]
    public DateTime Created { get; set; } = DateTime.Now;

    /*
        [ForeignKey("User")]
        public string Id { get; set; } = string.Empty;

        public int CategoryId { get; set; }
        
        public virtual List<Reply>? Replies { get; set; }
        public virtual User User { get; set; } = default!;
        public virtual Category Category { get; set; } = default!;

    */

}

