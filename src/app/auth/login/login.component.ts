import { Component, inject } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  router = inject(Router);
  authService = inject(AuthService);

  makeVisible = false;
  pwPlaceholder = "Passwort"
  emailPlaceholder = "beispielname@email.com"
  emailPlaceHolderGray = true;
  pwPlaceholderGray = true;
  pwPlaceholderRed = false;
  emailPlaceHolderRed = false; 
  errorMessage: string | null = null;

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
    this.checkEmail(email)
    this.checkPassword(password)
  }


  checkEmail(email: any){
    if(email.value === ""){
      this.emailPlaceholder = "Email is empty";
      this.emailPlaceHolderRed = true;
      this.emailPlaceHolderGray = false;
      this.setBackEmail()
    }else if(email.value !== ""){
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email.value.trim())) {
        let cachedEmailValue = email.value;
        email.value = ""
        this.emailPlaceholder = "Invalid Email"
        this.emailPlaceHolderRed = true;
        this.emailPlaceHolderGray = false;
        this.setBackEmail()
      }
    }
  }

  emailErrorMsg(errorTxt: string){
    this.emailPlaceholder = errorTxt
    this.emailPlaceHolderRed = true;
    this.emailPlaceHolderGray = false;
  }


  checkPassword(password:any){
    if(password.value === ""){
      this.pwPlaceholder = "Password is empty";
      this.pwPlaceholderRed = true;
      this.pwPlaceholderGray = false;
      setTimeout(() => {
        this.pwPlaceholder = "Password";
        this.pwPlaceholderGray = true;  
        
      }, 2500);
    }
  }

  setBackEmail(){
    setTimeout(() => {
      this.emailPlaceholder = "beispielname@email.com";
      this.emailPlaceHolderGray = true;  
      
    }, 2500);
  }

  logout() {
    this.authService.logoutUser();
  }
}
