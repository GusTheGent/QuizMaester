import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../shared/services/quiz.service';
import { Quiz } from '../../shared/interfaces/quiz.interface';
import { CommonModule } from '@angular/common';
import { Base64DecodePipe } from '../../shared/pipes/base64-decode.pipe';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RoutePath } from '../../routes/routes.enum';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, Base64DecodePipe, MatCardModule, MatButtonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  public quiz: Quiz | null = null;
  public currentQuestionIndex: number = 0;
  public showNextQuestion: boolean = false;
  public finishedQuiz: boolean = false;
  public answerFeedback: 'correct' | 'incorrect' | null = null;
  public selectedAnswer: string | null = null;
  public shuffledAnswers: string[] = [];
  public isAnswerValidating: boolean = false;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quiz = this.quizService.getCurrentQuiz;
    if(this.quiz) {
      this.loadShuffledAnswers();
    } else {
      this.router.navigate([RoutePath.EMPTY]);
    }
  }

  public onValidateAnswer(answer: string): void {
    this.isAnswerValidating = true;
    this.selectedAnswer = answer;
    if (
      answer === this.quiz!.results[this.currentQuestionIndex].correct_answer
    ) {
      this.answerFeedback = 'correct';
    } else {
      this.answerFeedback = 'incorrect';
    }

    setTimeout(() => {
      this.answerFeedback = null;
      this.selectedAnswer = null;
      if (this.currentQuestionIndex < (this.quiz?.results.length || 0) - 1) {
        this.currentQuestionIndex++;
        this.showNextQuestion = false;
        this.isAnswerValidating = false;
        this.loadShuffledAnswers();
      } else {
        this.finishedQuiz = true;
      }
    }, 500);
  }

  public formatAnswers(): string[] {
    return this.shuffledAnswers;
  }

  public loadShuffledAnswers(): void {
    let answers: string[] = [];
    const incorrect = [
      ...this.quiz!.results[this.currentQuestionIndex].incorrect_answers,
    ];
    const correct = this.quiz!.results[this.currentQuestionIndex].correct_answer;
    answers = [...incorrect, correct];

    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    this.shuffledAnswers = answers;
  }
}
