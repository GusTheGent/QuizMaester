import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../shared/services/quiz.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}]
})
export class HomeComponent implements OnInit {
  public settingsForm: FormGroup;

  constructor(
    private quizService: QuizService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.quizService.getSessionToken().subscribe((x) => console.log(x));
    this.initializeSettingsForm();
  }

  public submitQuizSettings(): void {}

  private initializeSettingsForm(): void {
    this.settingsForm = this.formBuilder.group({
      selectedQuantity: [10, Validators.max(50)],
      selectedCategory: [''],
      selectedDifficulty: [''],
      selectedQuizType: [''],
      encodingType: 'Base64 Encoding',
    });
  }
}
