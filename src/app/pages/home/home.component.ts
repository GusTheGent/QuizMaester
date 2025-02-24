import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Observable, Subject, takeUntil } from 'rxjs';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';

// Internal Imports
import { QuizService } from '../../shared/services/quiz.service';
import { TriviaCategory } from '../../shared/interfaces/quiz-category.interface';
import { OpenTriviaDB_Token_Response } from '../../shared/interfaces/token-response.interface';
import { SettingsForm } from '../../shared/interfaces/settings-form.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}]
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public settingsForm: FormGroup;
  public quizDifficulties: string[] = ['Any Difficulty', 'Easy', 'Medium', 'Hard'];
  public quizTypes: string[] = ['Any Type', 'Multiple Choice', 'True / False'];
  public quizCategories$: Observable<TriviaCategory[]> = this.quizService.getQuizCategories().pipe(
    map((categories) => categories.trivia_categories)
  )

  constructor(
    private quizService: QuizService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.quizService.getSessionToken().pipe(takeUntil(this.destroy$)).subscribe((token_response: OpenTriviaDB_Token_Response) => {
      this.quizService.saveToken(token_response);
    });
    this.initializeSettingsForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submitQuizSettings(): void {
    const settingsFormValues = this.settingsForm.value as SettingsForm;
    console.log(settingsFormValues)
  }

  private initializeSettingsForm(): void {
    this.settingsForm = this.formBuilder.group({
      selectedQuantity: [10, Validators.max(50)],
      selectedCategory: ['Any Category'],
      selectedDifficulty: ['Any Difficulty'],
      selectedQuizType: ['Any Type'],
      encodingType: 'Base64 Encoding',
    });
  }
}
