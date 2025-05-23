import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ValidationService } from '../../core/services/validation.service';
import { FirestoreService } from '../../core/services/firestore.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  private fsService = inject(FirestoreService);
  router = inject(Router);
  authService = inject(AuthService);
  validation = inject(ValidationService);
  hideSignupSuccessMsg = true;
  makeVisible = false;


  /** 
   * Uses setTimeout to ensure the class is applied after the initial view rendering.
  */
  ngOnInit() {
    setTimeout(() => {
      this.makeVisible = true;
    }, 0);
  }


  async signupBtnPressed(
    email: HTMLInputElement,
    password: HTMLInputElement,
    username: HTMLInputElement,
    signupForm: NgForm) {
    const emailValue = email.value;
    const passwordValue = password.value;
    const usernameValue = username.value;

    if (signupForm.invalid) {
      return;
    }

    const signupSuccess = await this.authService.registerUser(
      emailValue,
      passwordValue,
      usernameValue
    );
    this.validateMailPwName(emailValue, passwordValue, usernameValue);


    if (signupSuccess) {
      this.fsService.setUserDoc(emailValue, { username: usernameValue });

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

  ngOnDestroy(): void {
    this.authService.resetErrors();
  }
}
