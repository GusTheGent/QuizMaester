// Angular Framework Imports
import { Component } from '@angular/core';

// Angular Material Imports
import {MatToolbarModule} from '@angular/material/toolbar'
import { Router } from '@angular/router';
import { RoutePath } from '../../../routes/routes.enum';

@Component({
  selector: 'qm-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  public navigateToHomePage(): void {
    this.router.navigate([RoutePath.EMPTY]);
  }
}
