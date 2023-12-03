import { Component, OnInit } from "@angular/core"
import { IQuestion } from "./question"
import { IUser } from "../users/user"
import { HttpClient } from "@angular/common/http"
import { QuestionService } from "./questions.service"

@Component({
  selector: "app-questions-component",
  templateUrl: "./questions.component.html"
})

export class QuestionsComponent implements OnInit {

  private _questionFilter: string = ""
  questions: IQuestion[] = []

  // Array to store filtered questions based on the search value
  filteredQuestions: IQuestion[] = this.questions;

  user: IUser | undefined

  constructor(private _questionService: QuestionService) { }

  get questionFilter(): string {
    return this._questionFilter
  }

  set questionFilter(value: string) {
    this._questionFilter = value
    // Updates filtered questions based on the typed in search value
    this.filteredQuestions = this.performFilter(value)
  }

  // Method to fetch all questions
  getQuestions(): void {
    this._questionService.getQuestions()
      .subscribe(data => {
        console.log("All", data);
        this.questions = data;
        this.filteredQuestions = this.questions;
      })
  }

  // Method to perform filtering based on the typed search value
  performFilter(filterBy: string): IQuestion[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.questions.filter((question: IQuestion) =>
      question.title.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.getQuestions()
  }
}
