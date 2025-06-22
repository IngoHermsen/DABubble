import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {
  User as FirebaseUser,
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  
} from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { FirestoreService } from './firestore.service';
import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  public dbFs = inject(Firestore);
  private firebaseAuth = inject(Auth);
  private firebaseUserSubject = new BehaviorSubject<FirebaseUser | null>(null)
  showPassword = false;

  public firebaseUser: FirebaseUser| null;

  firebaseUser$ = this.firebaseUserSubject.asObservable(); // Public Observable
  user: User | null = null;


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
   * Initializes the authentication state listener.
   * The onAuthStateChanged listener triggers on signup, login, and logout events,
   * updating currentUser.email accordingly.
   * @singleton This is instantiated once as a singleton.
   */
  constructor() {
    onAuthStateChanged(this.firebaseAuth, (user: FirebaseUser | null) => {
      this.firebaseUser = user;
      this.firebaseUserSubject.next(user); 
    });

  }


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
      this.updateUserCredentials(userCredential.user, "displayName", usernameValue)

      return true;
    } catch (error: any) {
      this.showErrorMsg(error.code); 
      return false;
    };
  };


  /**
   * Executes on loginBtn.
   * Trys to sign in the user with email password. 
   * Updates the <currentUser> global.
   * Catches possible errors and logs their <code> 
   */
  async loginBtnPressed(email: HTMLInputElement, password: HTMLInputElement): Promise<void> {
    this.resetErrors();
    try {
      const userCredentials = await signInWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      this.firebaseUser = userCredentials.user;
      this.router.navigate(['/workspace/channel/Angular']); // hard coded until logic is implemented
    } catch (error: any) {
      this.showErrorMsg(error.code);
      return error.code;
    }
  }


  guestLoginBtnPressed(){
    this.router.navigate(['/workspace/channel/Angular']);// hard coded until logic is implemented
    this.logoutUser()
  }

  
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
    username: HTMLInputElement): User 
  {
    return {
      email: email.value,
      displayName: username.value,
      directMessages: [],
      avatarPath: "",
      isOnline: false,
      photoURL: "",
    };
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
      provider.setCustomParameters({ prompt: 'select_account' });
  
      await signInWithPopup(this.firebaseAuth, provider);
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
    } catch (error: any) {
    }
  }

  async updateUserCredentials(user: any, key: "displayName" | "photoURL", value: string) {
    await updateProfile(user, {
      [key]: value 
    });
  }


  refreshFirebaseUser() {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      user.reload().then(() => {
        this.firebaseUserSubject.next(user);
      });
    }
  }
}
