import { inject, Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private router = inject(Router);
  showWorkspaceMenu: boolean = true;
  showThreadSection: boolean = false;
  showDialog: boolean = false;

  // mobile options
  mobileView: boolean;
  showLogo: boolean = true; 
  

  constructor() { 
    this.mobileView = window.innerWidth <= 1000;
  }

  

  wsNavigate(route: string) {
    this.showLogo = route == 'workspace' ? true : false;
    this.router.navigate([route]);
  }

  openDialog(route: string) {

    this.showDialog = true;

    setTimeout(() => {
          this.router.navigate([{ outlets: { modal: ['dialog', 'new-channel'] }}])
          .then((success) => {
            if (success) {
              console.log('erfolgreich');
            } else {
              console.log('fehlgeschlagen')
            }
          })

    }, 2000)
  }
}