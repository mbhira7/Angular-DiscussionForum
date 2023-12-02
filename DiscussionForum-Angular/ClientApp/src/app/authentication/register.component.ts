
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
    this.registerForm = _formbuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]]
    });
  }

  registerUser() {
    const newUser = this.registerForm.value

    this._authService.register(newUser)
      .subscribe(response => {
        if (response.success) {
          this.registerStatus = "Registered successfully"
          console.log(response.message)
        }
        else {
          this.registerStatus = "Registration failed"
          console.log("User creation failed")
        }
    })
  }
}