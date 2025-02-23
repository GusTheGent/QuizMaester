import {
  HttpInterceptorFn,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { EnvironmentProviders } from '@angular/core';

export const provideHttpClientModule = (
  interceptors?: HttpInterceptorFn[]
): EnvironmentProviders => {

  return provideHttpClient(
    withFetch(),
    withInterceptors(interceptors!),
    withInterceptorsFromDi()
  );
};
