import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  ngOnInit() {
    // Use setTimeout to ensure the class is applied after the initial view rendering
    setTimeout(() => {
      this.makeVisible = true;
    }, 0); // Short delay (0ms) to ensure Angular has rendered the component
  }
  
  makeVisible = false
  
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
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
  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.loginUser(rawForm.email, rawForm.password).subscribe({
      next: () => {
        alert("Login Success")
        // this.router.navigateByUrl("/");
      }, 
      error: (err) => {
       this.errorMessage = err.code;
      },
      
    });
  }

  logout(){
    this.authService.logoutUser()
  }
}
