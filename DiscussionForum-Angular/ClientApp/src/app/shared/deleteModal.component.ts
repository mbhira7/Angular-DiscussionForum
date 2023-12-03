import { Component, Input } from "@angular/core"
import { IQuestion } from "../questions/question"

@Component({
  selector: "app-deleteModal-component",
  templateUrl: "./deleteModal.component.html",

})

export class DeleteModalComponent {
  @Input() question!: IQuestion;
}

