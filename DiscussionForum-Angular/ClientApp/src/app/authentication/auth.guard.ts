import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./authentication.service"
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {

  }

  canActivate(): boolean {
    if (this._auth.isLoggedIn) {
      return true;
    }
    alert("Log in to access this site");
    this._router.navigate(['auth/login']);
    return false;
  }
}
