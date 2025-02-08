import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor() { 
    
  }


  private dbFs = inject(Firestore);

  async addUserToFirestore(userId: string, userData: any) {
    const userDocRef = doc(this.dbFs, `users/${userId}`);
    return await setDoc(userDocRef, userData);
  }
}
