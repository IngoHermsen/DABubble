import { Component, inject } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';

//§ Explanations: 
//§ When to define imports in the decorator <imports: []> 
//§ Everything that is needed in the <HTML template> needs to be defined in <imports: []>
//§ Example <import Router> is not needed in the templates
//§ <import RouterLink> imports: [RouterLink] --> needed in template!

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CommonModule,
    FormsModule,
    NgStyle,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {

  validation = inject(ValidationService);
  router = inject(Router);
  authService = inject(AuthService);

  makeVisible = false;
  // pwPlaceholder = "Passwort";
  // emailPlaceholder = "beispielname@email.com";
  // emailPlaceHolderGray = true;
  // pwPlaceholderGray = true;
  // pwPlaceholderRed = false;
  // emailPlaceHolderRed = false;
  // errorMessage: string | null = null;

  ngOnInit() {

    // Use setTimeout to ensure the class is applied after the initial view rendering
    setTimeout(() => {
      this.makeVisible = true;
    }, 0); // Short delay (0ms) to ensure Angular has rendered the component
  }



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
  onSubmit(email: any, password: any): void {
    this.validation.checkEmail(email);
    this.validation.checkPassword(password);
  }


  // checkEmail(email: any) {
  //   const patternDoesNotMatch = !this.validation.checkEmailPattern(email);
  //   if (email.value === "") {
  //     this.validation.warningTextAndColor("emailPlaceholder", "Email is empty");
  //     this.validation.setPlaceholderDefault("emailPlaceholder", "beispielname@email.com");
  //   } else if (patternDoesNotMatch) {
  //     email.value = ""
  //     this.validation.warningTextAndColor("emailPlaceholder", "InvalidEmail");
  //     this.validation.setPlaceholderDefault("emailPlaceholder", "beispielname@email.com");
  //     console.log("Pattern does not match");
  //   }
  // }


  // checkPassword(password: any) {
  //   if (password.value === "") {
  //     this.validation.warningTextAndColor("pwPlaceholder", "Password is empty");
  //     this.validation.setPlaceholderDefault("pwPlaceholder", "Passwort");
  //   }
  // }


  // setPlaceholderDefault(placeholder: 'emailPlaceholder' | 'pwPlaceholder', defaultTxt: string) {
  //   setTimeout(() => {
  //     if (placeholder === 'emailPlaceholder') {
  //       this.validation.emailPlaceholder = defaultTxt;
  //       this.validation.emailPlaceHolderGray = true;
  //     } else if (placeholder === 'pwPlaceholder') {
  //       this.validation.pwPlaceholder = defaultTxt;
  //       this.validation.pwPlaceholderGray = true;
  //     }
  //   }, 2500);
  // }


  // warningTextAndColor(placeholder: 'emailPlaceholder' | 'pwPlaceholder', warningText: string) {
  //   if (placeholder === "emailPlaceholder") {
  //     this.validation.emailPlaceholder = warningText;
  //     this.validation.emailPlaceHolderRed = true;
  //     this.validation.emailPlaceHolderGray = false;
  //   } else if (placeholder === "pwPlaceholder") {
  //     this.validation.pwPlaceholder = warningText;
  //     this.validation.pwPlaceholderRed = true;
  //     this.validation.pwPlaceholderGray = false;
  //   }
  // }


  logout() {
    this.authService.logoutUser();
  }
}
