import { Component, Input, OnChanges, SimpleChanges } from "@angular/core"
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { IReply } from "../replies/reply"
import { ReplyService } from "../replies/replies.service"
import { Router } from "@angular/router"

@Component({
  selector: "app-question-reply-card-component",
  templateUrl: "./questionReplyCard.component.html",
})

export class QuestionReplyCardComponent {
  @Input() reply!: IReply;
  replyUpdateForm: FormGroup;

  // Initializing the reply update form with form controls and validation
  constructor(private _formbuilder: FormBuilder, private _replyService: ReplyService, private _router: Router) {

    this.replyUpdateForm = _formbuilder.group({
      content: ["", Validators.required],
    });

  }

  //Updates the form's content field to match the current reply's content when the reply changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reply && changes.reply.currentValue) {
      this.replyUpdateForm.patchValue({
        content: this.reply.content,
      });
    }
  }

  // Toggles the 'edit' property for the clicked reply
  toggleEdit(reply: IReply) {
    reply.edit = !reply.edit; 
  }

   // Method invoked on form submission to update a reply
  onSubmit() {
    console.log(this.replyUpdateForm)

     // Extracts values from the form and add questionId to create newReply object
    const newReply = {
      ...this.replyUpdateForm.value,
      questionId: this.reply.questionId
    };

    // Calling the service method to update a reply by its ID
    this._replyService.updateReply(this.reply.replyId, newReply)
      .subscribe(response => {
        if (response.success) {
          console.log(response.message)

          // Updates the content of the reply with the new content
          this.reply.content = newReply.content;
          this.reply.edit = false; 
        }
        else {
          console.log("Reply update failed")
        }
    })
  }
}
