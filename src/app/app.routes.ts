import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth-animation/auth-animation.component';
import { MainComponent } from './main-content/main-content.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditAvatarComponent } from './auth/edit-avatar/edit-avatar.component';
import { AuthPostAnimationComponent } from './auth/auth/auth.component';
import { NewPostComponent } from './main-content/new-post/new-post.component';
import { DirectMessagesComponent } from './main-content/direct-messages/direct-messages.component';
import { ChannelComponent } from './main-content/channel/channel.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'workspace', redirectTo: 'workspace/channel', pathMatch: 'full'},
    {
        path: 'main', component: AuthPostAnimationComponent,
        children:
            [
                { path: 'login', component: LoginComponent },
                { path: 'signup', component: SignupComponent },
                { path: 'imprint', component: ImprintComponent },
                { path: 'privacy', component: PrivacyComponent}
            ]
    },
    { path: 'auth', component: AuthComponent },
    {
        path: 'workspace', component: MainComponent,
        children:
            [
                { path: 'channel', component: ChannelComponent },
                { path: 'new-post', component: NewPostComponent },
                { path: 'direct-messages', component: DirectMessagesComponent }
            ]
    },
    { path: 'avatar', component: EditAvatarComponent },

];
