import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgClass } from '@angular/common';
import { ValidationService } from '../../services/validation.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  ngOnInit() {
    // Use setTimeout to ensure the class is applied after the initial view rendering
    setTimeout(() => {
      this.makeVisible = true;
    }, 0); // Short delay (0ms) to ensure Angular has rendered the component
  }


  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  validation = inject(ValidationService);
  hideSignupSuccessMsg = true;
  makeVisible = false;


  clearFieldsShowMsgAfterSignUpSuccess(email: any, password: any, name: any, signupSuccess: boolean) {
    if (signupSuccess) {
      this.showSignupSuccessMsg();
      setTimeout(() => {
        this.hideSignupSuccessMsg = true;
        this.clearInputValues(email, password, name);
      }, 2500);
    }
  }


  showSignupSuccessMsg() {
    this.hideSignupSuccessMsg = false;
  }


  clearInputValues(email: any, password: any, name: any) {
    email.value = "";
    password.value = "",
      name.value = "";
  }


  logSth(){
  }
  
 async onSubmit(email: any, password: any, name: any, signupForm: any ) {
    if(signupForm.invalid){
      return
    }  
    this.validation.checkEmail(email);
    this.validation.checkPassword(password);
    this.validation.checkName(name);
    const signUpSuccess = await this.authService.signUpBtnPressed(email, password, name);
    this.clearFieldsShowMsgAfterSignUpSuccess(email, password, name, signUpSuccess)
  }
}
