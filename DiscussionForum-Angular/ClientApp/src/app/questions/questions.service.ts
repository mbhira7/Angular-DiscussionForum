import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion } from './question'; 

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  private baseUrl = 'api/question/';

  constructor(private _http: HttpClient) { }

  getQuestions(): Observable<IQuestion[]> {
    return this._http.get<IQuestion[]>(this.baseUrl);
  }

  getUserQuestions(): Observable<IQuestion[]> {
    return this._http.get<IQuestion[]>(`api/question/user`)
  }

  getQuestion(id: number): Observable<IQuestion> {
    return this._http.get<IQuestion>(`api/question/${id}`)
  }

  createQuestion(newItem: IQuestion): Observable<any> {
    const createUrl = 'api/question/create';
    return this._http.post<any>(createUrl, newItem);
  }

  updateQuestion(questionId: number, newQuestion: any): Observable<any> {
    const url = `api/question/update/${questionId}`
    newQuestion.questionId = questionId;
    return this._http.put<any>(url, newQuestion);
  }

  deleteQuestion(questionId: number): Observable<any> {
    const url = `api/question/delete/${questionId}`;
    return this._http.delete(url);
  }
}
