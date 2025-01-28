import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ValidationService } from '../services/validation.service';


@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [
    RouterLink,
  ],

  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})


export class ImprintComponent {
  validation = inject(ValidationService);

}
