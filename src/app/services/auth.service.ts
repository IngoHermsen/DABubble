import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user, 
  User
} from '@angular/fire/auth';

import { from, Observable } from 'rxjs';
import { UserInterface } from '../auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserEmail: string | null = null
  // currentUser = this.firebaseAuth.currentUser;


  async signUpBtnPressed(email: any, password: any, username: any)  {
    try {
      console.log(typeof email);
      const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      // Profil des Benutzers aktualisieren (z.B. displayName)
      await updateProfile(userCredential.user, {
        displayName: username.value
      });
      return true;
    } catch (error: any) {
      console.log(error.code); // error.code gives a somewhat readable format.
      return false;
    };
  };


   async loginBtnPressed(email: any, password: any){
    try {
      // const userCredential = 
      
      await signInWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      console.log("I am a login subscriber");

    } catch (error: any) {
      console.log(error.code)
    }
  };
  

  async logoutUser() {
    try {
      await signOut(this.firebaseAuth);
      console.log("I am a logout subscriber");
      console.log('User logged out successfully');
      console.log(this.user$);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
    
}
