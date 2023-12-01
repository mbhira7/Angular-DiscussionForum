using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscussionForum_Angular.Models;

public class Question
{

    [Key]
    [JsonPropertyName("QuestionId")]
    public int QuestionId { get; set; }

    [JsonPropertyName("Title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("Content")]
    public string Content { get; set; } = string.Empty;

    [JsonPropertyName("Created")]
    public DateTime Created { get; set; } = DateTime.Now;

    [ForeignKey("User")]
    public string Id { get; set; } = string.Empty;
}

