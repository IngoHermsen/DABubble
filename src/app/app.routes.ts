import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main-content/main-content.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'auth', component: AuthComponent},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: MainComponent}
];
