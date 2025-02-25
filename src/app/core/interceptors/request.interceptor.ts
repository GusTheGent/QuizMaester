import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { getSavedToken } from "../../shared/utils/token.helper";

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const session_token =  getSavedToken('token');

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
