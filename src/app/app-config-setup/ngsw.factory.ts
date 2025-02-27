import { APP_INITIALIZER } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { SWHandlerService } from '../shared/services/sw-handler.service';
import { environment } from '../../environments/environment.development';

enum ServiceWorker {
  PATH_FILE = 'ngsw-worker.js',
}

const initializer = (pwaService: SWHandlerService) => () =>
  pwaService.activatePWAInstallation();

export const provideServiceWorkerAndInitializer = () => {
  return [
    provideServiceWorker(ServiceWorker.PATH_FILE, {
      enabled: environment.serviceWorker.enabled,
      registrationStrategy: environment.serviceWorker.registrationStrategy,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [SWHandlerService],
      multi: true,
    },
  ];
};
