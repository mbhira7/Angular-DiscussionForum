import { Component, OnInit } from "@angular/core"
import { IQuestion } from "./question"
import { HttpClient } from "@angular/common/http"
import { QuestionService } from "./questions.service"

@Component({
  selector: "app-questions-component",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})

export class QuestionsComponent implements OnInit {

  private _questionFilter: string = ""
  questions: IQuestion[] = []
  filteredQuestions: IQuestion[] = this.questions;

  constructor(private _questionService: QuestionService) { }

  get questionFilter(): string {
    return this._questionFilter
  }

  set questionFilter(value: string) {
    this._questionFilter = value
    this.filteredQuestions = this.performFilter(value)
  }

  /*questions: IQuestion[] = [
    {
      "QuestionId": 1,
      "Title": "Handling Null References in C#",
      "Content": "I'm encountering null reference exceptions in my C# code. How can I handle them?",
      "Created": new Date()
    },
    {
      "QuestionId": 2,
      "Title": "Entity Framework Core Best Practices",
      "Content": "What are some best practices for using Entity Framework Core in C# projects?",
      "Created": new Date()
    }
  ]*/

  getQuestions(): void {
    this._questionService.getQuestions()
      .subscribe(data => {
        console.log("All", data);
        this.questions = data;
        this.filteredQuestions = this.questions;
      })
  }

  performFilter(filterBy: string): IQuestion[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.questions.filter((question: IQuestion) =>
      question.Title.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.getQuestions()
  }
}
