import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginComponent, SignupComponent, ResetPasswordComponent, NgClass],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {


}