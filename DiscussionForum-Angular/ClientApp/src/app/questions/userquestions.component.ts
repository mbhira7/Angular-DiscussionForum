import { Component, OnInit } from "@angular/core"
import { IQuestion } from "./question"
import { HttpClient } from "@angular/common/http"
import { QuestionService } from "./questions.service"

@Component({
  selector: "app-userquestions-component",
  templateUrl: "./userquestions.component.html",
})

export class UserquestionsComponent implements OnInit {
  // Array to hold user's questions
  questions: IQuestion[] = []

  constructor(private _questionService: QuestionService) { }

  // Method to fetch user-specific questions
  getQuestions(): void {
    this._questionService.getUserQuestions()
      .subscribe(data => {
        console.log("User questions", data);
        this.questions = data;
      })
  }

   //Removes the deleted question when the deletionComplete event is emitted from the child component (deleteModal)
  onQuestionDeleted(deletedQuestionId: number): void {
    this.questions = this.questions.filter(question => question.questionId !== deletedQuestionId);
  }

  ngOnInit(): void {
    this.getQuestions()
  }

}
