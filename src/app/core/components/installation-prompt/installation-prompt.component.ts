import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { map, Observable, take, timer } from 'rxjs';
import { SWHandlerService } from '../../../shared/services/sw-handler.service';



@Component({
  selector: 'app-installation-prompt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installation-prompt.component.html',
  styleUrl: './installation-prompt.component.scss',
  providers: [SWHandlerService],
})
export class InstallationPromptComponent {

  display$: Observable<boolean> = this.swHanlder.displayInstaller$.pipe(
    map((promptExists) => promptExists && !this.closeModal)
  );
  closeModal = false;

  constructor(private swHanlder: SWHandlerService) {}

  installApp() {
    this.closeModal = true;
    timer(1000)
      .pipe(take(1))
      .subscribe(() => this.swHanlder.triggerInstall());
  }

  close() {
    this.closeModal = true;
    timer(1500)
      .pipe(take(1))
      .subscribe(() => this.swHanlder.closeModal());
  }
}
