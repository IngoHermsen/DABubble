import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';
import { ValidationService } from '../../services/validation.service';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
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
  makeVisible = false;
  namePlaceholder = "Name";
  // emailPlaceholder = "Email"
  // pwPlaceholder = "Password"

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  /**
* Handles the form submission for user signup.
* 
* This method retrieves the raw values from the signup form, including
* the username, email, and password. It then attempts to sign up the user
* using the authentication service. On successful signup, the user is 
* navigated to the home page ("/"). If the signup fails, an error message 
* could be displayed (though not implemented here).
* 
* @returns {void} This method does not return any value.
*/
  // onSubmit(): void {
  //   const rawForm = this.form.getRawValue();
  //   console.log(rawForm);
  //   this.authService.signUpUser(rawForm.email, rawForm.username, rawForm.password).subscribe({
  //     next: () => {
  //       this.router.navigateByUrl("/login");
  //     }, 
  //     error: (err) => {
  //      this.errorMessage = err.code;
  //     },

  //   });
  // }
  onSubmit(email: any, password: any): void {
    this.validation.checkEmail(email);
    this.validation.checkPassword(password);
  }
}
