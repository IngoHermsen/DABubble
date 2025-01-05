import { Component, inject } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
    ReactiveFormsModule,
    NgStyle,
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

  
// validation.service properties assigned to new Variable for better readability.
  emailErrorVisible = this.validation.elementVisibility.emailErrorVisible;

  

  ngOnInit() {
    // Use setTimeout to ensure the class is applied after the initial view rendering
    setTimeout(() => {
      this.makeVisible = true;
    }, 0); // Short delay (0ms) to ensure Angular has rendered the component
  }

  logCurrentUser() {
    console.log(this.authService.currentUser?.displayName);
  }


  async onSubmit(email: any, password: any, loginForm: NgForm){
    if(loginForm.invalid){
      return
    } 
    this.validation.checkEmail(email)
    this.validation.checkPassword(password)
    await this.authService.loginBtnPressed(email, password);
    
  }


  logout() {
    this.authService.logoutUser();
  }
}
