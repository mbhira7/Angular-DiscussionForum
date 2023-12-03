import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IQuestion } from "../questions/question"
import { Router } from "@angular/router"
import { QuestionService } from "../questions/questions.service"

@Component({
  selector: "app-deleteModal-component",
  templateUrl: "./deleteModal.component.html",
})

export class DeleteModalComponent  {
  // Input property to receive the question to be deleted
  @Input() question!: IQuestion;

  // Emits an event to the parent component (userquestions.component) when a deletion is completed
  @Output() deletionComplete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _router: Router, private _questionService: QuestionService) { }

  //Calls the service method to delete a question by its ID
  deleteQuestion(question: IQuestion): void {
      this._questionService.deleteQuestion(question.questionId)
        .subscribe(
          (response) => {
            if (response.success) {
              // If deletion is successful, emits an event to notify the parent component 
              this.deletionComplete.emit(question.questionId);
              console.log(response.message);
            }
          },
          (error) => {
            console.error('Error deleting question:', error);
          }
      );
  }
}

