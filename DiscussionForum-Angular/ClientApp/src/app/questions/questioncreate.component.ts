import { Component, OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { IQuestion } from "./question"
import { Router } from "@angular/router"
import { HttpClient } from "@angular/common/http"
import { QuestionService } from "./questions.service"
import { AuthService } from "../authentication/authentication.service"

@Component({
  selector: "app-questioncreate-component",
  templateUrl: "./questioncreate.component.html",
})

export class QuestioncreateComponent {
  questionCreateForm: FormGroup;

  constructor(private _auth: AuthService, private _formbuilder: FormBuilder, private _router: Router, private _questionService: QuestionService) {

    // Initializing the question creation form with form controls and validation
    this.questionCreateForm = _formbuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

   // Method invoked on form submission to create a new question
  onSubmit() {
    console.log(this.questionCreateForm)

    // Getting user input from the form
    const newQuestion = this.questionCreateForm.value

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