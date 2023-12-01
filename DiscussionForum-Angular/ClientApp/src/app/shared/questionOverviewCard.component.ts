import { Component, Input } from "@angular/core"
import { IQuestion } from "../questions/question"

@Component({
  selector: "app-question-overview-card-component",
  templateUrl: "./questionOverviewCard.component.html",

})

export class QuestionOverviewCardComponent {
  @Input() question!: IQuestion;
}
