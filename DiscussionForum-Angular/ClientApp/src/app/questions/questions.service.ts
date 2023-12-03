import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion } from './question'; 

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  // Base URL for API endpoints related to questions
  private baseUrl = 'api/question';

  constructor(private _http: HttpClient) { }

  // Retrieves all questions
  getQuestions(): Observable<IQuestion[]> {
    return this._http.get<IQuestion[]>(this.baseUrl);
  }

  // Retrieves user-specific questions
  getUserQuestions(): Observable<IQuestion[]> {
    return this._http.get<IQuestion[]>(`${this.baseUrl}/user`)
  }

  // Retrieves a specific question by ID
  getQuestion(id: number): Observable<IQuestion> {
    return this._http.get<IQuestion>(`${this.baseUrl}/${id}`)
  }

  // Creates a new question
  createQuestion(newItem: IQuestion): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/create`, newItem);
  }

  // Updates a question by ID
  updateQuestion(questionId: number, newQuestion: any): Observable<any> {
    const url = `${this.baseUrl}/update/${questionId}`
    newQuestion.questionId = questionId;
    return this._http.put<any>(url, newQuestion);
  }

  // Deletes a question by ID
  deleteQuestion(questionId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${questionId}`;
    return this._http.delete(url);
  }
}
