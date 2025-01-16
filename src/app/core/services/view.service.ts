import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private router = inject(Router)
  showThreadSection: boolean = false;
  showDialog: boolean = false;
  

  constructor() { 
  }

  navigate(route: string) {
    this.router.navigate([route])
  }
}
