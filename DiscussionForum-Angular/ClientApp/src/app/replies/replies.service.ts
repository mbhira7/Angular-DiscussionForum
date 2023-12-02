import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReply } from './reply';

@Injectable({
  providedIn: 'root'
})

export class ReplyService {

  private baseUrl = 'api/reply/';

  constructor(private _http: HttpClient) { }

  createReply(newReply: IReply): Observable<any> {
    const createUrl = 'api/reply/create';
    return this._http.post<any>(createUrl, newReply);
  }
}

