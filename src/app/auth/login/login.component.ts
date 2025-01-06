import { Component, inject } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {

  validation = inject(ValidationService);
  router = inject(Router);
  authService = inject(AuthService);
  makeVisible = false;
  user: any = null;

  /**
   * setTimeout used to ensure the class is applied after initial view rendering
   */
  ngOnInit() {
    setTimeout(() => {
      this.makeVisible = true;
    }, 0);
  }


  logCurrentUser() {
    console.log("Placeholder");
    // this.authService.user$.subscribe((user: { email: any; }) => console.log(user?.email));
  }


  async onSubmit(email: any, password: any, loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.validation.checkEmail(email);
    this.validation.checkPassword(password);
    await this.authService.loginBtnPressed(email, password);

  }


  async logout() {
    await this.authService.logoutUser();
  }
}
