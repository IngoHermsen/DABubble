import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './main-content/main-content.component';
import { AuthComponent } from './auth/auth-animation/auth-animation.component';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dabubble';

  trueAfter2500ms = false;

  ngOnInit(): void {
    /**
     * Sets trueAfter2500ms to true after 2500ms to trigger content display.
     */


    if (!sessionStorage.getItem("animationDone")) {
      setTimeout(() => {
        this.trueAfter2500ms = true;
      }, 2530);
    }else {
      this.trueAfter2500ms = true;
    }
  }
}
