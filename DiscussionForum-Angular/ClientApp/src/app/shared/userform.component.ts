import { Component, OnInit, Input } from "@angular/core"
import { FormGroup } from '@angular/forms';

@Component({
  selector: "app-userform-component",
  templateUrl: "./userform.component.html",
})

export class UserformComponent {
  @Input() parentForm!: FormGroup;
}

