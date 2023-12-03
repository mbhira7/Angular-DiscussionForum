import { Component, OnInit } from '@angular/core';
import { AuthService } from "../authentication/authentication.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
})

export class NavMenuComponent {

  constructor(private _authService: AuthService, private _router: Router) {}

  // Getter to check if the user is logged in
  get loggedIn() {
    return this._authService.isLoggedIn;
  }

  // Getter to retrieve the logged-in user's username for displaying
  get loggedInUserName() {
    return this._authService.loggedInUser;
  }

  // Calling the logout method from AuthService to log out user
  logout() {
    this._authService.logout()
      .subscribe(response => {
        if (response.success) {
          this._authService.setLoggedIn(false)
          this._authService.setLoggedInUser("")

          //Redirects to the home page
          this._router.navigate(['/']);

          console.log(response.message)
        }
        else {
          console.log("Logout failed")
        }
     })
  }
}

