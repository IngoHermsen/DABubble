import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private firebaseAuth = inject(Auth);
  private currentUser: { email: string | null; } = { email: null };

  constructor() {
    onAuthStateChanged(this.firebaseAuth, (user: FirebaseUser | null) => {
      this.currentUser.email = user?.email || null;
      console.log('onAuthStateChanged:', this.currentUser.email);
    });
  }


  errorCodes = {
    "auth/invalid-credential": "Falsche Email Password Kombination",
    "auth/invalid-email": "Unzulässige Email",
  };


errorCodesVisibility: any = {
  "auth/invalid-credential": false,
  "auth/invalid-email": false
}

showErrorMsg(errorCode: string) {
  if (errorCode in this.errorCodesVisibility) {
    this.errorCodesVisibility[errorCode] = true;
  } 
}

resetErrors() {
  this.errorCodesVisibility = {
    "auth/invalid-credential": false,
    "auth/invalid-email": false
  };
}


  /**
   * Executes on signuUpButton. 
   * Uses createUserWithEmailAndPassword to register a user.
   * Uses update Profile to add username to userCredential.
   * Catches possible errors in the process.
   * Returns boolean to show <SignupSuccessMsg>
   */
  async signUpBtnPressed(email: any, password: any, username: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      await updateProfile(userCredential.user, {
        displayName: username.value
      });
      return true;
    } catch (error: any) {
      console.log(error.code); // error.code gives a somewhat readable format.
      return false;
    };
  };


  /**
   * Executes on loginBtn.
   * Trys to sign in the user with email password. 
   * Updates the <currentUser> global.
   * Catches possible errors and logs their <code> 
   */
  async loginBtnPressed(email: any, password: any): Promise<void> {
    this.resetErrors()
    try {
      const userCredential = await signInWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      this.currentUser.email = userCredential.user.email; // Save user data
      console.log('User logged in:', this.currentUser.email);
    } catch (error: any) {
      console.error('Login error:', error.code);
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
      this.currentUser.email = null; // Clear user data
      console.log('User logged out, email cleared:', this.currentUser.email);
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  }


  /**
   * Get the email of current user.
   */
  getCurrentUserEmail(): string | null {
    return this.currentUser.email;
  }
}
