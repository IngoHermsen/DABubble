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



  /**
 * Initializes the animation sequence for the landing page.
 * - If the animation has already been completed (tracked in sessionStorage), navigates directly to /main.
 * - Otherwise, triggers a sequence of visual updates and navigation steps:
 *   - Makes the component visible immediately after rendering.
 *   - Sets a flag after 2500ms to control a second animation stage or trigger.
 *   - Hides the logo and stores an "animationDone" flag after 2700ms to avoid replaying the animation on refresh.
 *   - Finally, navigates to /main/login after the animation is complete (3000ms).
 */
  ngOnInit(): void {

    if (sessionStorage.getItem("animationDone")) {
      this.router.navigate(['/main']);
    }

    setTimeout(() => {
      this.makeVisible = true;
    }, 0); 


    setTimeout(() => {
      this.trueAfter2500ms = true;
    }, 2500);


    setTimeout(() => {
      this.hideLogo = true;
      sessionStorage.setItem("animationDone", "true");
    }, 2700);


    setTimeout(() => {
      this.router.navigate(['/main/login']);
    }, 3000);
  }
}





