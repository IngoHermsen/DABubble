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
  templateUrl: './auth-post-animation.component.html',
  styleUrl: './auth-post-animation.component.scss'
})
export class AuthPostAnimationComponent {
  ngOnInit() {
    // Use setTimeout to ensure the class is applied after the initial view rendering
    setTimeout(() => {
      this.makeVisible = true;
    }, 0); // Short delay (0ms) to ensure Angular has rendered the component
  }
  
  
  makeVisible = false

}
