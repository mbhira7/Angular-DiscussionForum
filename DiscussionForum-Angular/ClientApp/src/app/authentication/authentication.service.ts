import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // Boolean flag to track user's login status
  loggedIn = false;

  // Store the logged-in user's username
  loggedInUserName = "";

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

  // Base URL for API endpoints related to authentication
  private baseUrl = 'api/auth';

  constructor(private http: HttpClient) { }

  // Method to register a new user
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  // Method to authenticate user login
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }

  // Method to perform user logout
  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, null);
  }
}
