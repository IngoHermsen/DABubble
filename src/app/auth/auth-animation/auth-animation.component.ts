import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
  ],
  templateUrl: './auth-animation.component.html',
  styleUrl: './auth-animation.component.scss'
})
export class AuthComponent {

  makeVisible = false;
  private router = inject(Router);
  trueAfter2500ms = false;
  hideLogo = false;

  constructor() { }

  ngOnInit(): void {

    if (sessionStorage.getItem("animationDone")) {
      this.router.navigate(['/main']);
    }

    setTimeout(() => {
      this.makeVisible = true;
    }, 0); // Short delay (0ms) to ensure Angular has rendered the component


    /**
     * Sets trueAfter2500ms to true after 2500ms to trigger content display.
     */
    setTimeout(() => {
      this.trueAfter2500ms = true;
    }, 2500);


    /**
     * Hides the logo and marks the animation as completed by setting
     * the "animationDone" flag in sessionStorage after 2700ms.
     */
    setTimeout(() => {
      this.hideLogo = true;
      sessionStorage.setItem("animationDone", "true");
    }, 2700);


    /**
     * Navigates to main after the animation. 
     * Preventing the start animation to start again. 
     */
    setTimeout(() => {
      this.router.navigate(['/main/login']);
    }, 3000);
  }
}





