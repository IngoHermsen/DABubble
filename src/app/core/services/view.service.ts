import { inject, Injectable, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

type ActiveDialogType = 'newChannel' | 'logout' | 'cardProfile' |'cardProfileEdit';
type PlacementClassType = 'modal-content-center' | 'modal-content-top-right';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private router = inject(Router);

  showWorkspaceMenu: boolean = true;
  showDetailSection: boolean = false;
  showThreadSection: boolean = false;
  showModal: boolean = false;

  // channel scroll handling

  channelUserAction: boolean = false;
  channelAutoScroll: boolean = false; //set to true by 1) entering channel via route and 2) adding post. Declares if the postCollection change should trigger a scroll or not. Should prevent unintentionally bottom-scrolling if external user changed content.
  
  activeChannelId: string;
  activeDialog = signal<ActiveDialogType>("logout");
  modalContentClass: PlacementClassType

  // mobile options
  mobileView: boolean;
  showLogo: boolean = true;

  constructor() {
    this.mobileView = window.innerWidth <= 1000;
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