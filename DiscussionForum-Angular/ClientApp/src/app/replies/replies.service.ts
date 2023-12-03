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

  // Updates a reply by ID
  updateReply(replyId: number, newReply: any): Observable<any> {
    const url = `${this.baseUrl}/update/${replyId}`
    newReply.replyId = replyId;
    return this._http.put<any>(url, newReply);
  }
}

