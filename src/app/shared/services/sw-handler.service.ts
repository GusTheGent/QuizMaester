import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, take, timer } from 'rxjs';
import { BeforeInstallPromptEvent } from '../interfaces/sw.interface';
import { environment } from '../../../environments/environment.development';

enum ServiceWorkerEvent {
  BEFORE_INSTALL_PROMPT = 'beforeinstallprompt',
}

@Injectable({
  providedIn: 'root',
})
export class SWHandlerService {
  private installPrompt: BeforeInstallPromptEvent;
  private displayStatusBehavior = new BehaviorSubject<boolean>(false);

  displayInstaller$ = this.displayStatusBehavior.asObservable();

  constructor(private sw: SwUpdate) {
    if(environment.production)
      this.activatePWAInstallation();
  }

  activateLatestVersion() {
    if (!this.sw.isEnabled) return;
    this.sw.checkForUpdate().then((res: boolean) => {
      if (res) document.location.reload();
    });
  }

  activatePWAInstallation() {
    window.addEventListener(
      ServiceWorkerEvent.BEFORE_INSTALL_PROMPT,
      (event: Event) => {
        event.preventDefault();
        this.installPrompt = event as BeforeInstallPromptEvent;
        if (this.installPrompt) {
          timer(1000)
            .pipe(take(1))
            .subscribe(() => {
              this.displayStatusBehavior.next(true);
            });
        }
      }
    );
  }

  triggerInstall() {
    this.displayStatusBehavior.next(false);
    this.installPrompt.prompt();
  }

  closeModal() {
    this.displayStatusBehavior.next(false);
  }
}
