// import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
      public authService: AuthService

  ){

  }

  fb = inject(FormBuilder);
  // http = inject(HttpClient);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    
    console.log(this.form)

    // this.authService.SignIn(this.form.value.email, this.form.value.password)
   
    // this.http
    //   .post<{ user: UserInterface }>(
    //     'https://api.realworld.io/api/users/login',
    //     {
    //       user: this.form.getRawValue(),
    //     }
    //   )
    //   .subscribe((response) => {
    //     console.log('response', response);
    //     localStorage.setItem('token', response.user.token);
    //     this.authService.currentUserSig.set(response.user);
    //     this.router.navigateByUrl('/');
      };
  }

