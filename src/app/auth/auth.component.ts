import { Component } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginComponent, SignupComponent, ResetPasswordComponent, NgClass, NgStyle, RouterLink, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  

  constructor() {
    
    
    setTimeout(() => {
      this.trueAfter2500ms = true
    }, 2500);

    setTimeout(() => {
      this.hideLogo = true
    }, 2700);
  }

  trueAfter2500ms = false
  hideLogo = false
  
}

