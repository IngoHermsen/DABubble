import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { ValidationService } from '../../core/services/validation.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthPostAnimationComponent {

  private router = inject(Router);
  validation = inject(ValidationService);
  authService = inject(AuthService);
  hideElement = false;

  navigateToLogin() {
    this.router.navigate(['main', 'login']);
  }

  navigateToSignUp() {
    this.router.navigate(['main', 'signup']);
  }

}



