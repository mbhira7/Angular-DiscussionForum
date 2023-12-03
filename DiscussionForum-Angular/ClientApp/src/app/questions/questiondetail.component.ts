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

    // Initializing the reply form with form controls and validation
    this.replyForm = _formbuilder.group({
      content: ["", Validators.required],
    });
  }

  // Method to fetch a question by its ID
  getQuestionById(id: number): void {
    this._questionService.getQuestion(id)
      .subscribe(data => {
        console.log("Question", data)
        this.question = data;
      })
  }

  // Method invoked on form submission to create a new reply
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
            console.log("Reply creation failed")
          }
        })
    }
    else {
      // If the user is not logged in, display an alert and navigate to the login page
      alert("Log in to submit a reply");
      this._router.navigate(['auth/login']);
    }
  }

  ngOnInit(): void {

    //Used to retreve the question id from the route parameters
    const id = Number(this._route.snapshot.paramMap.get('id'));

    // Fetching the question details based on the retrieved ID
    this.getQuestionById(id);
  }
 
}
