import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { RouterLink, RouterOutlet, Router } from '@angular/router';


@Component({
  selector: 'app-auth-post-animation',
  standalone: true,
  imports: [LoginComponent, NgClass, NgStyle, RouterLink],
  templateUrl: './auth-post-animation.component.html',
  styleUrl: './auth-post-animation.component.scss'
})
export class AuthPostAnimationComponent {

}
