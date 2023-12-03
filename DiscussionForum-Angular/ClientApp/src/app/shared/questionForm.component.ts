import { Component, OnInit, Input } from "@angular/core"
import { FormGroup } from '@angular/forms';

@Component({
  selector: "app-questionForm-component",
  templateUrl: "./questionForm.component.html",
})

export class QuestionFormComponent {
  @Input() parentForm!: FormGroup;
}
