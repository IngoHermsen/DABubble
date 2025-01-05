import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user
} from '@angular/fire/auth';

import { from, Observable } from 'rxjs';
import { UserInterface } from '../auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUser = this.firebaseAuth.currentUser;
  currentUserSignal = signal<UserInterface | null | undefined>(undefined);
  

  async signUpBtnPressed(email: any, password: any, username: any)  {
    try {
      console.log(typeof email);
      const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      // Profil des Benutzers aktualisieren (z.B. displayName)
      await updateProfile(userCredential.user, {
        displayName: username.value
      });
      this.currentUser = userCredential.user
      return true;
    } catch (error: any) {
      console.log(error.code); // error.code gives a somewhat readable format.
      return false;
    };
  };


   async loginBtnPressed(email: any, password: any){
    try {
      const userCredential = await signInWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      this.currentUser = userCredential.user
    } catch (error: any) {
      console.log(error.code)
    }
  };
  

  logoutUser(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
