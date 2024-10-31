import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { RouterLink, RouterOutlet, Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgClass, NgStyle, LoginComponent, RouterLink, RouterOutlet, SignupComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthPostAnimationComponent {

  private router = inject(Router)
  hideElement = false
  
  navigateToLogin(){
    this.router.navigate(['main', 'login'])
  }

  navigateToSignUp(){
    this.router.navigate(['main', 'signup'])
  }
  
  ngOnInit() {
    this.navigateToLogin()
  }
}
