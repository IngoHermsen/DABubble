import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ValidationService } from '../core/services/validation.service';


@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    RouterLink,
  ],

  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  validation = inject(ValidationService);

}
