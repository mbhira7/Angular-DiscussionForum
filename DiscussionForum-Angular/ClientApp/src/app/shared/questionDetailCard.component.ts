import { Component, Input } from "@angular/core"
import { IQuestion } from "../questions/question"

@Component({
  selector: "app-question-detail-card-component",
  templateUrl: "./questionDetailCard.component.html",

})

export class QuestionDetailCardComponent {
  @Input() question!: IQuestion;
}
