import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../shared/services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit{

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
      console.log(this.quizService.getCurrentQuiz)
  }

}
