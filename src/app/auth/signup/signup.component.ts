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

  // === Injected Services ===
  private fsService = inject(FirestoreService);
  router = inject(Router);
  authService = inject(AuthService);
  validation = inject(ValidationService);

  // === Local Data ===
  hideSignupSuccessMsg = true;
  makeVisible = false;

  // === Lifecycle ===
  /**
   * Ensures animations trigger correctly after initial rendering.
   */
  ngOnInit() {
    setTimeout(() => {
      this.makeVisible = true;
    }, 0);
  }


  // === Event Handlers ===
  /**
   * Handles the signup button press event and manages the registration flow.
   */
  async signupBtnPressed(
    email: HTMLInputElement,
    password: HTMLInputElement,
    username: HTMLInputElement,
    signupForm: NgForm
  ) {
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
    this.validateMailPwName(emailValue, passwordValue);

    if (signupSuccess) {
      this.fsService.setUserDoc(emailValue, { username: usernameValue });

      this.clearFieldsShowMsgAfterSignUpSuccess(signupSuccess, signupForm);
      setTimeout(() => {
        this.router.navigate(['main', 'avatar']);
      }, 3000);
    }
  }


  // === State Management ===
  /**
   * Displays a success message and clears the form after signup.
   */
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


  /**
   * Shows the signup success message.
   */
  showSignupSuccessMsg() {
    this.hideSignupSuccessMsg = false;
  }


  /**
   * Resets all form fields.
   */
  clearForm(form: NgForm) {
    form.reset();
  }


  // === Helper Methods ===
  /**
   * Runs validation checks for email and password values.
   */
  validateMailPwName(
    emailValue: string,
    passwordValue: string
  ) {
    this.validation.checkEmail(emailValue);
    this.validation.checkPassword(passwordValue);
  }

  
  // === Cleanup ===
  /**
   * Resets authentication errors when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.authService.resetErrors();
  }
}
