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
  mobileWorkspaceHeader: boolean = false; 
  

  constructor() { 
    this.mobileView = window.innerWidth <= 880;
    console.log(`windows.innerwidth:${window.innerWidth}, mobileView = ${this.mobileView}`)
  }

  navigate(route: string) {
    this.router.navigate([route])
  }
}
