import { Component, OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { IQuestion } from "./question"
import { Router } from "@angular/router"
import { HttpClient } from "@angular/common/http"
import { QuestionService } from "./questions.service"
import { AuthService } from "../authentication/authentication.service"

@Component({
  selector: "app-questionform-component",
  templateUrl: "./questionform.component.html",
})

export class QuestionformComponent {
  questionForm: FormGroup;

  constructor(private _auth: AuthService, private _formbuilder: FormBuilder, private _router: Router, private _questionService: QuestionService) {
    this.questionForm = _formbuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  onSubmit() {
    console.log(this.questionForm)

    const newQuestion = this.questionForm.value

    this._questionService.createQuestion(newQuestion)
      .subscribe(response => {
        if (response.success) {
          console.log(response.message)
          this._router.navigate(["/questions"])
        }
        else {
          console.log("Question creation failed")
        }
      })
  }
}