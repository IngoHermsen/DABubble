import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    { path: '/', component: AuthComponent},
    { path: 'auth', component: AuthComponent},
    { path: 'login', component: LoginComponent}
];
