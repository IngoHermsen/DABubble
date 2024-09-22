import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main-content/main-content.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
    {path: '', component: AuthComponent},
    // { path: '', redirectTo: 'auth', pathMatch: 'full'},
    { path: 'auth', component: AuthComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent}, 
    { path: 'home', component: MainComponent}, 
];
