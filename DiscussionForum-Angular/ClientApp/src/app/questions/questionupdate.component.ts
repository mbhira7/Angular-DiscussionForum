import { Component, OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { IQuestion } from "./question"
import { Router } from "@angular/router"
import { HttpClient } from "@angular/common/http"
import { QuestionService } from "./questions.service"
import { AuthService } from "../authentication/authentication.service"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-questionupdate-component",
  templateUrl: "./questionupdate.component.html",
})

export class QuestionupdateComponent implements OnInit {
  questionUpdateForm: FormGroup;
  questionId: number = -1;

  constructor(private _auth: AuthService, private _formbuilder: FormBuilder, private _router: Router,
    private _questionService: QuestionService, private _route: ActivatedRoute) {
    this.questionUpdateForm = _formbuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  onSubmit() {
    console.log(this.questionUpdateForm)
    const newQuestion = this.questionUpdateForm.value

    this._questionService.updateQuestion(this.questionId, newQuestion)
      .subscribe(response => {
        if (response.success) {
          console.log(response.message)
          this._router.navigate(["/userquestions"])
        }
        else {
          console.log("Question update failed")
        }
    })
  }

  getQuestionById(questionId: number) {
    this._questionService.getQuestion(questionId)
      .subscribe(
        (question: any) => {
          console.log("retrived question: ", question);
          this.questionUpdateForm.patchValue({
            title: question.title,
            content: question.content
          });

        },
        (error: any) => {
          console.log("Error loading question for edit: ", error);
        }
    )
  }

  ngOnInit(): void {
    //Used to retreve the question id
    this.questionId = Number(this._route.snapshot.paramMap.get('id'));
    this.getQuestionById(this.questionId);
  }

}
