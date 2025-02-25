import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenTriviaDB_Token_Response } from '../interfaces/token-response.interface';
import { Categories } from '../interfaces/quiz-category.interface';
import { SettingsForm } from '../interfaces/settings-form.interface';
import { createQuizParams } from '../utils/quiz-params.helper';
import { Quiz } from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private readonly baseUrl = 'https://opentdb.com';

  private currentQuiz: Quiz;

  constructor(private http: HttpClient) { }

  public getSessionToken(): Observable<OpenTriviaDB_Token_Response> {
    const params = new HttpParams().set('command', 'request');
    return this.http.post<OpenTriviaDB_Token_Response>(`${this.baseUrl}/api_token.php`, null, {
      params: params
    })
  }

  public getQuizCategories(): Observable<Categories> {
    return this.http.get<Categories>(`${this.baseUrl}/api_category.php`);
  }

  public createQuiz(settingsForm: SettingsForm): Observable<Quiz>{
    const params = createQuizParams(settingsForm);
    return this.http.get<Quiz>(`${this.baseUrl}/api.php`, {
      params: params
    })
  }

  public get getCurrentQuiz(): Quiz {
    return this.currentQuiz;
  }

  public set setCurrentQuiz(quiz: Quiz) {
    this.currentQuiz = quiz;
  }

}
