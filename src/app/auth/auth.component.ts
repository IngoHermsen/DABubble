import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthPostAnimationComponent } from './auth-post-animation/auth-post-animation.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    AuthPostAnimationComponent, LoginComponent, NgClass, NgStyle,
    ResetPasswordComponent, RouterLink, RouterOutlet, SignupComponent
  ],
    templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {

    if (sessionStorage.getItem("animationDone")) {
      this.router.navigate(['/main']);
    }

    setTimeout(() => {
      this.trueAfter2500ms = true;
    }, 2500);

    setTimeout(() => {
      this.hideLogo = true;
      sessionStorage.setItem("animationDone", "true");
    }, 2700);
  }
  trueAfter2500ms = false;
  hideLogo = false;

}





