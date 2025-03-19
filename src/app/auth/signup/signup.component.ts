import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule, NgClass } from '@angular/common';
import { ValidationService } from '../../core/services/validation.service';
import { FirestoreService } from '../../core/services/firestore.service';

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

  private fsService = inject(FirestoreService);

  /** 
  * Uses setTimeout to ensure the class is applied after the initial view rendering.
   */
  ngOnInit() {
    setTimeout(() => {
      this.makeVisible = true;
    }, 0);
  }


  router = inject(Router);
  authService = inject(AuthService);
  validation = inject(ValidationService);
  hideSignupSuccessMsg = true;
  makeVisible = false;


  async signupBtnPressed(
    email: HTMLInputElement,
    password: HTMLInputElement,
    username: HTMLInputElement,
    signupForm: any) {
    const emailValue = email.value;
    const passwordValue = password.value;
    const usernameValue = username.value;

    if (signupForm.invalid) {
      return;
    }
    this.fsService.setUserDoc(emailValue, {username: usernameValue})
    // async setUserDoc(email: string, user: any) {
    //       await setDoc(doc(this.dbFs, 'users', email), user);
    //   }
    this.validateMailPwName(emailValue, passwordValue, usernameValue);
    const signupSuccess = await this.authService.registerUser(
      emailValue,  //? --> Needs no typing because .value is always a string Typescript knows that. 
      passwordValue,
      usernameValue
    );
    if (signupSuccess) {
      this.clearFieldsShowMsgAfterSignUpSuccess(signupSuccess, signupForm);
      setTimeout(() => {
        this.router.navigate(['main', 'avatar']);
      }, 3000);
    }
  }


  clearFieldsShowMsgAfterSignUpSuccess(
    signupSuccess: boolean,
    signupForm: NgForm
  ) {
    if (signupSuccess) {
      this.showSignupSuccessMsg();
      setTimeout(() => {
        this.hideSignupSuccessMsg = true;
        this.clearForm(signupForm);
      }, 2500);
    }
  }


  showSignupSuccessMsg() {
    this.hideSignupSuccessMsg = false;
  }


  clearForm(form: NgForm) {
    form.reset();
  }


  validateMailPwName(
    emailValue: string,
    passwordValue: string,
    usernameValue: string) {
    this.validation.checkEmail(emailValue);
    this.validation.checkPassword(passwordValue);
    this.validation.checkName(usernameValue);
  }


}
