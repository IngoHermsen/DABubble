import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc, onSnapshot } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dbFs = inject(Firestore);
  channelIds: string[] = []; 

  channelsRef = collection(this.dbFs, 'workspaces', 'DevSpace', 'channels');

  channelSnapshot = onSnapshot(this.channelsRef, snapshot => {
    this.channelIds = [];  
    snapshot.docs.map(doc => {
        this.channelIds.push(doc.id)
        console.log('channelIds: ', this.channelIds)
      })
  })


  async addUserToFirestore(userId: string, userData: any) {
    const userDocRef = doc(this.dbFs, `users/${userId}`);
    return await setDoc(userDocRef, userData);
  }


  async setUserDoc(email: string, user: any) {
      await setDoc(doc(this.dbFs, 'users', email), user);
  }

}
