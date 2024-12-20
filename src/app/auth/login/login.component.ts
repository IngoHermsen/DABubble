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

  
// validation.service properties assigned to new Variable for better readability.
  emailErrorVisible = this.validation.elementVisibility.emailErrorVisisble;

  ngOnInit() {
    // Use setTimeout to ensure the class is applied after the initial view rendering
    setTimeout(() => {
      this.makeVisible = true;
    }, 0); // Short delay (0ms) to ensure Angular has rendered the component
  }


  onSubmit(email: any, password: any): void {
    console.log("This is emailErrorVisible", this.emailErrorVisible);
    console.log("Does this change in login.ts ??", this.validation.elementVisibility.emailErrorVisible);
    this.validation.checkEmail(email);
    this.validation.checkPassword(password);
  }


  logout() {
    this.authService.logoutUser();
  }
}
