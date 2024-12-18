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
  currentUserSignal = signal<UserInterface | null | undefined>(undefined);

  signUpBtnPressed = async (email: any, password: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      console.log(userCredential.user);
      return true
    } catch (error: any) {
      console.log(error.code); // error.code gives a somewhat readable format.
      return false
    };
  };


  /**
   * Logs in a user using their email and password.
   *
   * This function attempts to authenticate the user with Firebase using the provided 
   * email and password. Normally, the `signInWithEmailAndPassword` method returns a 
   * `Promise<UserCredential>`, which contains details about the authenticated user.
   *
   * However, to maintain a clean separation of concerns and to avoid exposing user 
   * information unnecessarily, we use `.then(() => {})` to explicitly transform the 
   * returned `UserCredential` into `void`. This ensures that no data is emitted from 
   * the function, and the consumer only receives a signal that the login process 
   * completed, without any additional information.
   *
   * The `Promise<void>` is then converted into an `Observable<void>` using the 
   * `from()` operator, allowing the function to return an observable that emits no 
   * value and simply completes when the authentication is successful.
   *
   * @param {string} email - The email of the user trying to log in.
   * @param {string} password - The password of the user trying to log in.
   * @returns {Observable<void>} - An observable that completes when the login process 
   * is successful, emitting no value.
   */
  loginUser(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => { });
    return from(promise);
  }

  logoutUser(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise)
  }
}
