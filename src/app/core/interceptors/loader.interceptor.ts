import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { finalize, tap } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';


export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  let loaderWasShown = false;

  return next(req).pipe(
    tap(() => {
        loaderService.showLoader();
        loaderWasShown = true;
    }),
    finalize(() => {
      if (loaderWasShown) loaderService.hideLoader();
    })
  );
};
