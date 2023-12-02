import { Component, Input } from "@angular/core"
import { IReply } from "../replies/reply"

@Component({
  selector: "app-question-reply-card-component",
  templateUrl: "./questionReplyCard.component.html",
})

export class QuestionReplyCardComponent {
  @Input() reply!: IReply;
}
