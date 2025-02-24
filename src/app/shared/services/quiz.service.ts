import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenTriviaDB_Token_Response } from '../interfaces/token-response.interface';
import { Categories } from '../interfaces/quiz-category.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private readonly baseUrl = 'https://opentdb.com';

  constructor(private http: HttpClient) { }

  public getSessionToken(): Observable<OpenTriviaDB_Token_Response> {
    const params = new HttpParams().set('command', 'request');
    return this.http.post<OpenTriviaDB_Token_Response>(`${this.baseUrl}/api_token.php`, null, {
      params: params
    })
  }

  public saveToken(token_response: OpenTriviaDB_Token_Response): void {
    sessionStorage.setItem('token', token_response.token);
  }

  public getSavedToken(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public getQuizCategories(): Observable<Categories> {
    return this.http.get<Categories>(`${this.baseUrl}/api_category.php`);
  }

  // public createQuiz(): Observable<any> {

  // }

}
