import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

type ActiveDialogType = 'newChannel' | 'logout' | 'cardProfile' |'cardProfileEdit';
type PlacementClassType = 'modal-content-center' | 'modal-content-top-right';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private router = inject(Router);
  private fsService = inject(FirestoreService);

  showWorkspaceMenu: boolean = true;
  showThreadSection: boolean = false;
  //$ Back to false after Testing
  showModal: boolean = true;
  //$ Back to false after Testing
  
  activeChannelId: string;
  //$ Back to "logout" after Testing
  activeDialog = signal<ActiveDialogType>("cardProfileEdit");
  //$ Back to just declaration after Testing
  modalContentClass: PlacementClassType = "modal-content-center"
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

  modalHandler(name: ActiveDialogType, className: PlacementClassType) {
    this.openModal(name);
    this.setModalContentClass(className);
  }

  openModal(name: ActiveDialogType) {
    this.showModal = true;
    this.activeDialog.set(name);
  }

  setModalContentClass(className: PlacementClassType) {
    this.modalContentClass = className;
  }
}