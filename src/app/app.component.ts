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

  constructor(router: Router) {
    
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {  // oder welche URL Sie auch immer prüfen möchten
          document.body.style.background = 'linear-gradient(180deg, rgba(119, 124, 243, 1) 30%, rgba(62, 70, 232, 1) 100%)';
          setTimeout(() => {
            document.body.style.background = '#eceefe';
          }, 2500);
        }
        //  else {
        //   document.body.style.background = '#eceefe';
        // }
      }
    });
  }
}
