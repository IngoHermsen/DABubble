import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { doc, Firestore, setDoc, onSnapshot } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dbFs = inject(Firestore);
  channelIds: WritableSignal<string[]> = signal([]);

  channelsRef = collection(this.dbFs, 'workspaces', 'DevSpace', 'channels');

  channelSnapshot = onSnapshot(this.channelsRef, snapshot => {
    const cNames = snapshot.docs.map(doc => doc.id);
    this.channelIds.set(cNames)
  });

  async addUserToFirestore(userId: string, userData: any) {
    const userDocRef = doc(this.dbFs, `users/${userId}`);
    return await setDoc(userDocRef, userData);
  }
}
