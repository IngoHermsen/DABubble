import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
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

//§ Explanations: 
//§ JavaScript/TypeScript, async/await is one way to handle asynchronous operations,
//§ but it's not the only way. signUpUser function is asynchronous,
//§ but it uses a different mechanism: Promises and Observables.
//§ A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.
//§ Why the $ sign in user$ --> Indicates that the variable holds an Observable.
//§ currentUserSignal = signal<UserInterface | null | undefined>(undefined)
//§ This represents a reactive state variable (using the Angular signal API) 
//§ signal: This is the function being called.
//§ <UserInterface | null | undefined>: This is the generic type specifying the types the signal can hold.
//§ (undefined): This is the initial value passed into the signal function.
//§ 

export class AuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<UserInterface | null | undefined>(undefined);

  /**
 * Signus up a new user with Firebase authentication.
 * 
 * This method creates a new user using the provided email and password,
 * and updates the user's profile with the given username.
 * @method 
 * @param {string} email - The email address of the new user.
 * @param {string} username - The display name to be set for the user.
 * @param {string} password - The password for the new user.
 * @returns {Observable<void>} - An Observable that resolves once the user is registered and the profile is updated.
 */
  signUpUser(email: string, username: string, password: string): Observable<void> {
    const promise = (createUserWithEmailAndPassword(this.firebaseAuth, email, password))
      .then((response) => {
        console.log("This is response", response);
        console.log("This is response.user", response.user);
        updateProfile(response.user, { displayName: username });
      });

    return from(promise);
  }


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
