import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth-animation/auth-animation.component';
import { MainComponent } from './main-content/main-content.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditAvatarComponent } from './auth/edit-avatar/edit-avatar.component';
import { AuthPostAnimationComponent } from './auth/auth-post-animation/auth.component';

export const routes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'main', component: AuthPostAnimationComponent},
    { path: 'auth', component: AuthComponent},
    { path: 'signup', component: SignupComponent}, 
    { path: 'home', component: MainComponent}, 
    { path: 'avatar', component: EditAvatarComponent}
];
