import { Injectable, inject, signal } from '@angular/core';
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


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private firebaseAuth = inject(Auth);
  private currentUser: { email: string | null; } = { email: null };
  showPassword = false;

  
  /**
   * Initializes the authentication state listener.
   * The onAuthStateChanged listener triggers on signup, login, and logout events,
   * updating currentUser.email accordingly.
   * @singleton This is instantiated once as a singleton.
   */
  constructor() {
    console.log("I am a Singelton, that is why i log once.");
    onAuthStateChanged(this.firebaseAuth, (user: FirebaseUser | null) => {
      this.currentUser.email = user?.email || null;
      console.log('onAuthStateChanged:', this.currentUser.email);
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


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  showErrorMsg(errorCode: string) {
    console.log("I am in errorMsg");
    if (errorCode in this.errorCodesVisibility) {
      console.log("Error msg is true");
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


  /**
   * Executes on signuUpButton. 
   * Uses createUserWithEmailAndPassword to register a user.
   * Uses update Profile to add username to userCredential.
   * Catches possible errors in the process.
   * Returns boolean to show SignupSuccessMsg.
   */
  async signUpBtnPressed(email: any, password: any, username: any) {
    this.resetErrors();
    try {
      const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email.value, password.value);
      await updateProfile(userCredential.user, {
        displayName: username.value
      });
      return true;
    } catch (error: any) {
      this.showErrorMsg(error.code);
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
    this.resetErrors();
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
      this.currentUser.email = userCredential.user.email;
      console.log('User logged in with Google:', this.currentUser.email);
    } catch (error: any) {
      console.error('Google login error:', error.code);
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
   * Getter method to make currentUser available in other components.
   */
  getCurrentUserEmail(): string | null {
    return this.currentUser.email;
  }
}
