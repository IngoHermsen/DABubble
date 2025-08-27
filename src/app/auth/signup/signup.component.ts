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
   * Uses setTimeout to ensure the class is applied after the initial view rendering.
  */
  ngOnInit() {
    setTimeout(() => {
      this.makeVisible = true;
    }, 0);
  }


  // === Event Handlers ===
  /**
   * Handles the signup button press event and manages the registration flow.
   * 
   * - Extracts values for email, password, and username from the input elements.
   * - Validates the `signupForm` and exits early if invalid.
   * - Calls the `authService.registerUser` method to register the new user.
   * - Runs validation checks on email, password, and username.
   * - If registration is successful:
   *   - Creates a user document in Firestore with the chosen username.
   *   - Clears the form fields and displays a success message.
   *   - After a short delay, navigates the user to the avatar setup page.
   * 
   * @param email - Input element containing the user’s email.
   * @param password - Input element containing the user’s password.
   * @param username - Input element containing the user’s chosen username.
   * @param signupForm - Reference to the Angular form used for validation and state management.
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


  // === Helper Methods ===
  validateMailPwName(
    emailValue: string,
    passwordValue: string
  ) {
    this.validation.checkEmail(emailValue);
    this.validation.checkPassword(passwordValue);
  }

  
  // === Cleanup ===
  ngOnDestroy(): void {
    this.authService.resetErrors();
  }
}
