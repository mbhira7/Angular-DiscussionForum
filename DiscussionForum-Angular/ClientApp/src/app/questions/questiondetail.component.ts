import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-questiondetail-component",
  templateUrl: "./questiondetail.component.html",
})

export class QuestiondetailComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
  }
 
}
