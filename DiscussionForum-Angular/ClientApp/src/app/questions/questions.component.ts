import { Component, OnInit } from "@angular/core"
import { IQuestion } from "./question"
import { IUser } from "../users/user"
import { HttpClient } from "@angular/common/http"
import { QuestionService } from "./questions.service"
import { UserService } from "../users/users.service"

@Component({
  selector: "app-questions-component",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})

export class QuestionsComponent implements OnInit {

  private _questionFilter: string = ""

  questions: IQuestion[] = []
  filteredQuestions: IQuestion[] = this.questions;
  userId: string = ""
  user: IUser | undefined

  constructor(private _questionService: QuestionService, private _userService: UserService,) { }

  get questionFilter(): string {
    return this._questionFilter
  }

  set questionFilter(value: string) {
    this._questionFilter = value
    this.filteredQuestions = this.performFilter(value)
  }

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
      question.title.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.getQuestions()
  }
}
