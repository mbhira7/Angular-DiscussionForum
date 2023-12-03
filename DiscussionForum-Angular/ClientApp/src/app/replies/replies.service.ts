import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReply } from './reply';

@Injectable({
  providedIn: 'root'
})

export class ReplyService {

  // Base URL for reply-related API endpoints
  private baseUrl = 'api/reply';

  constructor(private _http: HttpClient) { }

  // Creates a new reply
  createReply(newReply: IReply): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/create`, newReply);
  }
}

