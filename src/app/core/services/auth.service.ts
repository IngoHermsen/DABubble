import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { doc, setDoc, WithFieldValue } from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  public dbFs = inject(Firestore);
  private firebaseAuth = inject(Auth);
  firebaseUser: any = {}


  private firebaseUserSubject = new BehaviorSubject<User | null>(null)

  firebaseUser$ = this.firebaseUserSubject.asObservable(); // Public Observable

  showPassword = false;
  user: User | null = null;

  /**
   * Initializes the authentication state listener.
   * The onAuthStateChanged listener triggers on signup, login, and logout events,
   * updating currentUser.email accordingly.
   * @singleton This is instantiated once as a singleton.
   */
  constructor() {
    onAuthStateChanged(this.firebaseAuth, (user: any) => {
      this.firebaseUser = user
      this.firebaseUserSubject.next(user) // Hier wird das Subject aktualisiert. 
      console.log('currentUser:', user);
      // console.log('onAuthStateChanged:', user.email);
    });
  }


  errorCodes = {
    "auth/invalid-credential": "Falsche Email Password Kombination",
    "auth/invalid-email": "Unzulässige Email",
    "auth/email-already-in-use": "Diese Email wird bereits verwendet"
  };


  errorCodesVisibility: any = {
    "auth/invalid-credential": false,
    "auth/invalid-email": false,
    "auth/email-already-in-use": false
  };


  /**
   * Executes on signuUpButton. 
   * Uses createUserWithEmailAndPassword to register a user.
   * Uses update Profile to add username to userCredential.
   * Catches possible errors in the process.
   * Returns boolean to show SignupSuccessMsg.
   */
  async registerUser(
    emailValue: string,
    passwordValue: string,
    usernameValue: string) {
    this.resetErrors();
    try {
      const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, emailValue, passwordValue);
      await updateProfile(userCredential.user, {
        displayName: usernameValue
      });

      this.user = {
        email: emailValue,
        displayName: usernameValue,
        directMessages: [],
        avatarPath: "",
        isOnline: false,
      };

      this.setUserDoc(emailValue);

      return true;
    } catch (error: any) {
      this.showErrorMsg(error.code); // error.code gives a somewhat readable format.
      return false;
    };
  };


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  showErrorMsg(errorCode: string) {
    if (errorCode in this.errorCodesVisibility) {
      this.errorCodesVisibility[errorCode] = true;
    }
  }

  resetErrors() {
    this.errorCodesVisibility = {
      "auth/invalid-credential": false,
      "auth/invalid-email": false,
      "auth/email-already-in-use": false
    };
  }


  private createUserObject(
    email: HTMLInputElement,
    username: HTMLInputElement): User {
    return {
      email: email.value,
      displayName: username.value,
      directMessages: [],
      avatarPath: "",
      isOnline: false,
    };
  }


  /**
   * Executes on loginBtn.
   * Trys to sign in the user with email password. 
   * Updates the <currentUser> global.
   * Catches possible errors and logs their <code> 
   */
  async loginBtnPressed(email: any, password: any): Promise<void> {
    this.resetErrors();
    try {
      await signInWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      this.router.navigate(['/workspace']);
    } catch (error: any) {
      this.showErrorMsg(error.code);
      return error.code;
    }
  }


  /**
 * Handles Google sign-in using a popup.
 * Returns void, but updates currentUser on success.
 * Handles errors consistently with existing error handling pattern.
 */
  async signInWithGoogle(): Promise<void> {
    this.resetErrors();
    try {
      const provider = new GoogleAuthProvider();
      // Force user to select account
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const userCredential = await signInWithPopup(this.firebaseAuth, provider);
      this.firebaseUser.email = userCredential.user.email;
    } catch (error: any) {
      this.showErrorMsg(error.code);
      return error.code;
    }
  }


  /**
   * Logs out the user, and clears the email.
   */
  async logoutUser(): Promise<void> {
    try {
      await signOut(this.firebaseAuth);
      this.firebaseUser.email = null; // Clear user data
    } catch (error: any) {
    }
  }


  async setUserDoc(email: string) {
    if (this.user) {
      await setDoc(doc(this.dbFs, 'users', email), this.user);
    }

  }
}
