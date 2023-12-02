import { Component, OnInit } from '@angular/core';
import { AuthService } from "../authentication/authentication.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent {

  constructor(private _authService: AuthService, private _router: Router) {
    
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  get loggedIn() {
    return this._authService.isLoggedIn;
  }

  get loggedInUserName() {
    return this._authService.loggedInUser;
  }

  logout() {
    this._authService.logout()
      .subscribe(response => {
        if (response.success) {
          this._authService.setLoggedIn(false)
          this._authService.setLoggedInUser("")
          this._router.navigate(['/']);
          console.log(response.message)
        }
        else {
          console.log("Logout failed")
        }
      })
  }
}

