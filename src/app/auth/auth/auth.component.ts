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
  imports: [NgClass, NgStyle, LoginComponent, RouterLink, RouterOutlet, SignupComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthPostAnimationComponent {
  // Use setTimeout to ensure the class is applied after the initial view rendering
  // Short delay (0ms) to ensure Angular has rendered the component
  ngOnInit() {
    setTimeout(() => {
      this.makeVisible = true;
    }, 0); 
  }
  
  
  makeVisible = false

}
