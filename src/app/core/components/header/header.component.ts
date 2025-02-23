// Angular Framework Imports
import { Component } from '@angular/core';

// Angular Material Imports
import {MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'qm-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
