import { Component, OnInit } from "@angular/core"
import { AuthService } from "./authentication.service"
import { Router } from "@angular/router"
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-login-component",
  templateUrl: "./login.component.html",
})

export class LoginComponent {
  loginForm: FormGroup;
  loginError:string = ""

  constructor(private _formbuilder: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.loginForm = _formbuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get loggedIn() {
    return this._authService.isLoggedIn;
  }

  loginUser() {
    const user = this.loginForm.value

    this._authService.login(user)
      .subscribe(response => {
        if (response.success) {
          this._authService.setLoggedIn(true);
          this._authService.setLoggedInUserId(response.id);
          this._authService.setLoggedInUser(response.username);
          console.log("User logged in:", response.username);
          this._router.navigate(["/questions"])
          // Clear any previous login error message
          this.loginError = '';
        }
        else {
          this.loginError = "Login failed"
        }
        // Handle any other logic if needed for success case
      }, error => {
        // Handle server or network errors
        console.error("Error occurred:", error);
        this.loginError = "Login failed";
      });
  }
}
