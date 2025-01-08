/**
 * Hier werden nochmal Erklärungen auf deutsch abgegeben zu den Teilen die ich noch nicht 
 * richtig verstehe. 
 *
 */

import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  /** ------------------- as User as FirebaseUser FRAGE ---------------------------
   * Genau, diese Zeile ist ein sogenannter "Import Alias" oder eine "Import Renaming".
User as FirebaseUser bedeutet:

Es wird der Typ User aus '@angular/fire/auth' importiert
Aber wir wollen ihn in unserem Code unter dem Namen FirebaseUser verwenden
   *
   */
  User as FirebaseUser,
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  /** --------------------------- PRIVATE FRAGEN ---------------------------
   * 
   *private ist ein Access Modifier in TypeScript/Angular und bedeutet,
    dass auf diese Properties nur innerhalb der Klasse zugegriffen werden kann
  - nicht von außen. Es ist also eine Art Kapselung der Daten.
   */

  /**
   * Lass mich zuerst deine Frage zu private beantworten:
    Der Hauptgrund für private ist nicht die Namenskollision, sondern das Konzept der Kapselung.
    Es geht darum:

    Die innere Implementierung zu verbergen
    Zu kontrollieren, wie auf die Daten zugegriffen wird
    Unbeabsichtigte Änderungen von außen zu verhindern
    Ein Beispiel: Wenn currentUser public wäre,
     könnte jede andere Komponente den Wert direkt ändern, was zu inkonsistenten Zuständen führen könnte.
    Mit private zwingst du andere Komponenten, definierte Methoden zu nutzen (wie z.B. login/logout), die sicherstellen, dass alles korrekt abläuft.
   *
   */
  private firebaseAuth = inject(Auth);
  private currentUser: { email: string | null; } = { email: null };


  /** --------------------------- CONSTRUCTOR FRAGEN ---------------------------
   * Zu deinen Constructor-Fragen:

"Ein constructor hilft die Klasse zu konstruieren?" - Ja, genau! Der Constructor ist eine spezielle Methode,
 die automatisch aufgerufen wird, wenn eine neue Instanz der Klasse erstellt wird. Er ist dafür da:

Initialen Code auszuführen
Properties zu initialisieren  --> Für komplexe properties die z.B Parameter benötigen
Notwendige Setups durchzuführen

"Auth.Service ist ein service der in andere Komponenten injected wird,
 heißt das das bei einer injection auch schon der Konstruktor dieses services gestartet wird?"
  - Ja, absolut richtig! Wenn der Service zum ersten Mal irgendwo injected wird
  , wird eine Instanz erstellt und der Constructor ausgeführt.
   Da Angular Services normalerweise als Singleton arbeiten, passiert dies nur einmal, auch wenn der Service in mehrere Komponenten injected wird
   *
   */
  constructor() {
    /**
     * onAuthStateChanged ist ein "Listener" - er wird nicht nur einmal ausgeführt,
     *  sondern jedes Mal wenn sich der Auth-Status ändert (Login, Logout, etc.)
     */

    onAuthStateChanged(this.firebaseAuth, (user: FirebaseUser | null) => {
      this.currentUser.email = user?.email || null;
    });
  }


  errorCodes = {
    "auth/invalid-credential": "Falsche Email Password Kombination",
    "auth/invalid-email": "Unzulässige Email",
  };


  errorCodesVisibility: any = {
    "auth/invalid-credential": false,
    "auth/invalid-email": false
  };

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
