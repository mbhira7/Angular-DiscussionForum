import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'api/user/';

  constructor(private _http: HttpClient) { }

  geUser(): Observable<IUser> {
    return this._http.get<IUser>(this.baseUrl);
  }
}
