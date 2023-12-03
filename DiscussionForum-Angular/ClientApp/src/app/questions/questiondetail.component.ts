import { Component, OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { HttpClient } from "@angular/common/http"
import { QuestionService } from "./questions.service"
import { ReplyService } from "../replies/replies.service"
import { IQuestion } from "./question"
import { Router } from "@angular/router"
import { AuthService } from "../authentication/authentication.service"

@Component({
  selector: "app-questiondetail-component",
  templateUrl: "./questiondetail.component.html",
})

export class QuestiondetailComponent implements OnInit {
  replyForm: FormGroup;
  question: IQuestion | undefined

  constructor(private _auth: AuthService, private _formbuilder: FormBuilder, private _router: Router,
    private _route: ActivatedRoute, private _questionService: QuestionService, private _replyService: ReplyService) {
    this.replyForm = _formbuilder.group({
      content: ["", Validators.required],
    });
  }

  getQuestionById(id: number): void {
    this._questionService.getQuestion(id)
      .subscribe(data => {
        console.log("Question", data)
        this.question = data;
      })
  }

  onSubmit() {
    if (this._auth.isLoggedIn && this.question) {
      const newReply = {
        ...this.replyForm.value,
        questionId: this.question.questionId 
      };

      this._replyService.createReply(newReply)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message)
            this._router.navigate(["/questions"])
          }
          else {
            console.log(response.reply)
            console.log("Reply creation failed")
          }
        })
    }
    else {
      alert("Log in to submit a reply");
      this._router.navigate(['auth/login']);
    }
  }


  ngOnInit(): void {

    //Used to retreve the question id
    const id = Number(this._route.snapshot.paramMap.get('id'));

    this.getQuestionById(id);
  }
 
}
