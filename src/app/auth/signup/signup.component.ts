import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule, NgClass } from '@angular/common';
import { ValidationService } from '../../core/services/validation.service';


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

  @ViewChild('signupForm') signupForm!: NgForm;
  /** 
   * Uses setTimeout to ensure the class is applied after the initial view rendering.
   *
   */
  ngOnInit() {
    setTimeout(() => {
      this.makeVisible = true;
    }, 0);
  }


  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  validation = inject(ValidationService);
  hideSignupSuccessMsg = true;
  makeVisible = false;


  clearFieldsShowMsgAfterSignUpSuccess(
    signupSuccess: boolean,
    signupForm: NgForm
  ) 
  {
    if (signupSuccess) {
      this.showSignupSuccessMsg();
      setTimeout(() => {
        this.hideSignupSuccessMsg = true;
        this.clearForm(signupForm)
      }, 2500);
    }
  }


  showSignupSuccessMsg() {
    this.hideSignupSuccessMsg = false;
  }


  clearForm(form: NgForm) {
    form.reset();
}

  // clearInputValues(emailValue: string, passwordValue: string, usernameValue: string) {
  //   emailValue = "";
  //   passwordValue = "",
  //   usernameValue = "";
  // }


  async onSubmit(
    email: HTMLInputElement,
    password: HTMLInputElement,
    username: HTMLInputElement,
    signupForm: any
  ) 
  {
    const emailValue = email.value
    const passwordValue = password.value
    const usernameValue = username.value

    if (signupForm.invalid) {
      return;
    }

    this.validateMailPwName(emailValue, passwordValue, usernameValue)
    const signupSuccess = await this.authService.signUpBtnPressed(
      emailValue,  //? --> Needs no typing because .value is always a string Typescript knows that. 
      passwordValue,
      usernameValue
    );
    this.clearFieldsShowMsgAfterSignUpSuccess(signupSuccess, signupForm );
  }


  validateMailPwName(
    emailValue: string,
    passwordValue: string, 
    usernameValue: string) 
    {
    this.validation.checkEmail(emailValue);
    this.validation.checkPassword(passwordValue);
    this.validation.checkName(usernameValue);
  }

//! Delete
testFormReset(){
  this.clearForm(this.signupForm)
}
//! Delete


}
