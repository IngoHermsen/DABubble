import { Component, inject } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
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

  validation = inject(ValidationService);
  router = inject(Router);
  authService = inject(AuthService);
  makeVisible = false;
  userEmail: string | null = null;
  firebaseUser: any 
  

  /**
   * setTimeout used to ensure the class is applied after initial view rendering.
   * Updates the userEmail onInit. 
   */
  ngOnInit() {
    setTimeout(() => {
      this.makeVisible = true;
    }, 0);
    this.authService.firebaseUser$.subscribe(user => {
      this.firebaseUser = user
    })
  }
  

  async onSubmit(email: any, password: any, loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    await this.authService.loginBtnPressed(email, password);
  }


  logout(): void {
    this.authService.logoutUser().then(() => {

      console.log('After logout:', this.firebaseUser.email);
    });
  }





}
