import { Component, OnInit } from "@angular/core"
import { AuthService } from "./authentication.service"
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-register-component",
  templateUrl: "./register.component.html",
})

export class RegisterComponent  {
  registerForm: FormGroup;
  registerStatus: string = ""

  constructor(private _formbuilder: FormBuilder, private _authService: AuthService) {
    // Initializing the registration form with form controls and validation
    this.registerForm = _formbuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]]
    });
  }

  // Calling the register method from AuthService to create a new user
  registerUser() {
    const newUser = this.registerForm.value

    this._authService.register(newUser)
      .subscribe(response => {
        if (response.success) {
          // If registration is successful, display success message
          this.registerStatus = "Registered successfully"
          console.log(response.message)
        }
        else {
          // If registration fails, display registration failure message
          this.registerStatus = "Registration failed"
          console.log("User creation failed")
        }
    })
  }
}