import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private router = inject(Router);
  private fsService = inject(FirestoreService);

  showWorkspaceMenu: boolean = true;
  showThreadSection: boolean = false;
  showModal: boolean = false;
  
  activeChannelId: string;
  activeDialog: string;
  currentRoute: string;

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

  openModal(name: string) {
    this.showModal = true;
    this.activeDialog = name;
  
  }
}