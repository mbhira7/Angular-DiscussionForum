import { Component, OnInit } from "@angular/core"
import { AuthService } from "./authentication.service"
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-login-component",
  templateUrl: "./login.component.html",
})

export class LoginComponent {
  loggedIn = false
  loginForm: FormGroup;

  constructor(private _formbuilder: FormBuilder, private _authService: AuthService) {
    this.loginForm = _formbuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  loginUser() {
    const user = this.loginForm.value

    this._authService.login(user)
      .subscribe(response => {
        if (response.success) {
          this.loggedIn = true
          console.log(response.message)
        }
        else {
          console.log("Login failed")
        }
      })
  }
}
