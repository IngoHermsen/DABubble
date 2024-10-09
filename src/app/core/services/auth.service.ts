import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('login successful');
        console.log('result', result)
        // this.guestLogin = guestLogin || false;
        // this.SetUserData(result.user);
      })
      .catch(() => {
        // this.noMatchingData.next(true);
        setTimeout(() => {
          // this.noMatchingData.next(false)
        }, 6000)
      });
  }

}

