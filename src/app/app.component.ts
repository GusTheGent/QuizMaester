import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InstallationPromptComponent } from './core/components/installation-prompt/installation-prompt.component';
import { SWHandlerService } from './shared/services/sw-handler.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InstallationPromptComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  constructor(private swHandler: SWHandlerService) {}

  ngOnInit(): void {
    this.swHandler.activateLatestVersion();
  }
}
