import { Component, inject, OnDestroy } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { ValidationService } from '../../core/services/validation.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {

  // === Injected Services ===
  validation = inject(ValidationService);
  router = inject(Router);
  authService = inject(AuthService);
  dataService = inject(DataService);


  // === Local Data ===
  makeVisible = false;
  firebaseUser: any; 


  // === Lifecycle ===
  /**
   * setTimeout used to ensure the class is applied after initial view rendering.
   * Updates the userEmail onInit. 
   */
  ngOnInit() {
    setTimeout(() => {
      this.makeVisible = true;
    }, 0);
    this.authService.firebaseUser$.subscribe(user => {
      this.firebaseUser = user;
    });
  }


  // === Event Handlers ===
  /**
   * Executing loginBtnPressed from authService,
   * only when the form is valid.
   */
  async onSubmit(email: any, password: any, loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    await this.authService.loginBtnPressed(email, password);
  }


  /**
   * Logs out firebaseAuth user.
   * By using logoutUser from authService.
   */
  logout(): void {
    this.authService.logoutUser().then(() => {
    });
  }


// === Cleanup ===  
    /**
   * Clearing validation errors after component is destroyed.
   */
  ngOnDestroy(): void {
    this.authService.resetErrors();
  }


}
