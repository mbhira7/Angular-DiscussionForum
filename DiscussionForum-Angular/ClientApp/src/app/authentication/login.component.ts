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

    // Initializing the login form with form controls and validation
    this.loginForm = _formbuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  //Calling the login method from AuthService to authenticate the user
  loginUser() {
    const user = this.loginForm.value

    this._authService.login(user)
      .subscribe(response => {
        if (response.success) {
          // If login is successful, set logged-in status and username
          this._authService.setLoggedIn(true);
          this._authService.setLoggedInUser(response.username);

          console.log("User logged in:", response.username);
          this._router.navigate(["/questions"])

          // Clear any previous login error message
          this.loginError = '';
        }
        else {
          this.loginError = "Login failed"
        }
      }, error => {
        // Handle server or network errors
        console.error("Error occurred:", error);
        this.loginError = "Login failed";
    });
  }
}
