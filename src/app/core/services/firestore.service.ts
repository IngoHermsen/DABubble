import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { doc, Firestore, setDoc, onSnapshot } from '@angular/fire/firestore';
import { collection, CollectionReference, DocumentReference, updateDoc } from 'firebase/firestore';
import { Channel } from '../interfaces/channel';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dbFs = inject(Firestore);
  channelIds: WritableSignal<string[]> = signal([]);

  channelsRef: CollectionReference = collection(this.dbFs, 'workspaces', 'DevSpace', 'channels');
  activeChannelRef: DocumentReference;

  channelSnapshot = onSnapshot(this.channelsRef, snapshot => {
    const cNames: Array<string> = snapshot.docs.map(doc => doc.id);
    this.channelIds.set(cNames)
  });


  async addUserToFirestore(userId: string, userData: any) {
    const userDocRef = doc(this.dbFs, `users/${userId}`);
    return await setDoc(userDocRef, userData);
  }


  async setUserDoc(email: string, user: any) {
      await setDoc(doc(this.dbFs, 'users', email), user);
  }

  async addChannelToFirestore(channel: Channel) {
      await setDoc(doc(this.channelsRef, channel.channelName), channel);
  }

  async updateUserDoc(collection: string, id: string, data: any){
    const docRef = doc(this.dbFs, collection, id)
    const newData = data
    await updateDoc(docRef, newData)
  }

}
