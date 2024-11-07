import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';


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
  

/**
 * Initializes the component and sets up navigation behavior.
 * 
 * - Calls `navigateToLogin()` to show child route login OnInit.
 * - Subscribes to router events to track navigation changes and conditionally hide/show elements.
 */
ngOnInit() {
  this.navigateToLogin();

  /**
   * Subscribes to router events to detect when navigation is complete.
   * 
   * - If the route includes 'signup' in the URL, sets `hideElement` to `true`.
   * - Otherwise, `hideElement` remains `false`, making the element visible.
   * 
   * @param {Event} event - The router event triggered on navigation.
   */
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.hideElement = event.url.includes('signup');
    }
  });
}


}



