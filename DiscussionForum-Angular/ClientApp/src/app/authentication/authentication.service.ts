import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  loggedInUserName = "";
  loggedInId = "";

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  get isLoggedIn() {
    return this.loggedIn;
  }

  setLoggedInUser(value: string) {
    this.loggedInUserName = value;
  }

  get loggedInUser() {
    return this.loggedInUserName;
  }

  setLoggedInUserId(value: string) {
    this.loggedInId = value;
  }

  get loggedInUserId() {
    return this.loggedInId;
  }

  private baseUrl = 'api/auth';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, null);
  }
}
