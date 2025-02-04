import { inject, Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private router = inject(Router);
  showThreadSection: boolean = false;
  showDialog: boolean = false;

  // mobile options
  mobileView: boolean;
  showLogo: boolean = true; 
  

  constructor() { 
    this.mobileView = window.innerWidth <= 880;
    console.log(`windows.innerwidth:${window.innerWidth}, mobileView = ${this.mobileView}`)
  }

  wsNavigate(route: string) {
    console.log(route);
    this.showLogo = route == 'workspace' ? true : false;
    this.router.navigate([route]);

  }
}