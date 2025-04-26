import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

type ActiveDialogType = 'newChannel' | 'logout' | 'cardProfile';

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
  activeDialog = signal< ActiveDialogType>("logout")
  modalContentClass: string;
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

  modalHandler(name: ActiveDialogType, className: string){
    this.openModal(name)
    this.setModalContentClass(className)    
  }
  
  openModal(name: ActiveDialogType) {
    this.showModal = true;
    this.activeDialog.set(name);
  }

  setModalContentClass(className:string){
    this.modalContentClass = className
  }
}