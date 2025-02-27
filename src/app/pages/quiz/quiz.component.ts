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
  public finishedQuiz: boolean = false;
  public answerFeedback: 'correct' | 'incorrect' | null = null;
  public selectedAnswer: string | null = null;
  public shuffledAnswers: string[] = [];
  public isAnswerValidating: boolean = false;
  public correctAnswer: string | null = null;
  public score: string[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quiz = this.quizService.getCurrentQuiz;
    if (this.quiz) {
      this.loadShuffledAnswers();
    } else {
      this.router.navigate([RoutePath.EMPTY]);
    }
  }

  public onValidateAnswer(answer: string): void {
    this.isAnswerValidating = true;
    this.selectedAnswer = answer;
    let correct = this.quiz!.results[this.currentQuestionIndex].correct_answer;
    this.correctAnswer = correct;
    this.createScore(this.selectedAnswer, this.correctAnswer);
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
      this.isAnswerValidating = false;
      this.correctAnswer = null;
      if (this.currentQuestionIndex < (this.quiz?.results.length || 0) - 1) {
        this.currentQuestionIndex++;
        this.loadShuffledAnswers();
      } else {
        this.finishedQuiz = true;
        console.log(this.score);
      }
    }, 1000);
  }

  public formatAnswers(): string[] {
    return this.shuffledAnswers;
  }

  public loadShuffledAnswers(): void {
    let answers: string[] = [];
    const incorrect = [
      ...this.quiz!.results[this.currentQuestionIndex].incorrect_answers,
    ];
    const correct =
      this.quiz!.results[this.currentQuestionIndex].correct_answer;
    answers = [...incorrect, correct];

    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    this.shuffledAnswers = answers;
  }

  public getFace(): string {
    if (!this.quiz || !this.quiz.results || this.quiz.results.length === 0) {
      return '';
    }

    const percentage = (this.score.length / this.quiz.results.length) * 100;

    if (percentage < 40) {
      return 'assets/icons/faces/sad-face.svg';
    } else if (percentage >= 40 && percentage < 50) {
      return 'assets/icons/faces/unamused-face.svg';
    } else if (percentage === 50) {
      return 'assets/icons/faces/neutral-face.svg';
    } else if (percentage >= 50 && percentage < 90) {
      return 'assets/icons/faces/happy-face.svg';
    } else {
      return 'assets/icons/faces/excited-face.svg';
    }
  }

  public onNewQuiz(): void {
    this.router.navigate([RoutePath.EMPTY]);
  }

  private createScore(selectedAnswer: string, correctAnswer: string): void {
    if (selectedAnswer === correctAnswer) {
      this.score.push(correctAnswer);
    }
  }
}
