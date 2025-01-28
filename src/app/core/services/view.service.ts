import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private router = inject(Router)
  showThreadSection: boolean = false;
  showDialog: boolean = false;
  mobileView: boolean;  

  constructor() { 
    this.mobileView = window.innerWidth <= 880;
    console.log(`windows.innerwidth:${window.innerWidth}, mobileView = ${this.mobileView}`)
  }

  navigate(route: string) {
    this.router.navigate([route])
  }
}
