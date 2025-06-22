import { inject, Injectable, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// === Type Definitions ===

type ActiveDialogType = 'newChannel' | 'logout' | 'cardProfile' | 'cardProfileEdit';
type PlacementClassType = 'modal-content-center' | 'modal-content-top-right';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  // === Injected Services ===
  private router = inject(Router);

  // === State Management ===
  showWorkspaceMenu: boolean = true;
  showDetailSection: boolean = true;
  showThreadSection: boolean = false;
  showModal: boolean = false;


  activeChannelId: string;
  activeDialog = signal<ActiveDialogType>('logout');
  modalContentClass: PlacementClassType;

  // === ViewModel ===
  mobileView: boolean;
  showLogo: boolean = true;

  // === Constructor / Injection ===

  constructor() {
    this.mobileView = window.innerWidth <= 1000;
  }

  // === Methods ===

  /**
   * Handles modal logic by opening a modal and setting its placement class.
   * 
   * - Sets the currently active dialog via `openModal()`.
   * - Applies the correct modal placement class via `setModalContentClass()`.
   * 
   * @param name The modal/dialog identifier.
   * @param className The CSS class controlling modal placement.
   */
  modalHandler(name: ActiveDialogType, className: PlacementClassType) {
    this.openModal(name);
    this.setModalContentClass(className);
  }


  /**
   * Opens a modal and sets the `activeDialog` signal.
   * 
   * - Displays the modal by setting `showModal` to true.
   * - Updates the active dialog state.
   * 
   * @param name The identifier for the modal/dialog to be shown.
   */
  openModal(name: ActiveDialogType) {
    this.showModal = true;
    this.activeDialog.set(name);
  }

  
  /**
   * Sets the CSS class for modal placement.
   * 
   * - Updates the modal position based on layout.
   * 
   * @param className One of the predefined modal content placement classes.
   */
  setModalContentClass(className: PlacementClassType) {
    this.modalContentClass = className;
  }

}
