import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { provideHttpClientModule } from './app-config-setup/http-client.factory';
import { requestInterceptor } from './core/interceptors/request.interceptor';
import { provideServiceWorkerAndInitializer } from './app-config-setup/ngsw.factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClientModule([loaderInterceptor, requestInterceptor]),
    provideServiceWorkerAndInitializer()
]
};
