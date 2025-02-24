import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { QuizService } from "../../shared/services/quiz.service";

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const quizService = inject(QuizService);
  const session_token =  quizService.getSavedToken('token');

  if (session_token) {
    req = req.clone({
      setParams: {
        token: `${session_token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => throwError(() => error))
  );
};
