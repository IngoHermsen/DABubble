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

  // === Injected Services ===
  private router = inject(Router);
  validation = inject(ValidationService);
  authService = inject(AuthService);

  // === Local Data ===
  /**
   * Boolean flag used to toggle visibility of elements in the template.
   */
  hideElement = false;


  // === Navigation ===
  /**
   * Navigates the user to the login page.
   */
  navigateToLogin() {
    this.router.navigate(['main', 'login']);
  }

  
  /**
   * Navigates the user to the signup page.
   */
  navigateToSignUp() {
    this.router.navigate(['main', 'signup']);
  }
}
