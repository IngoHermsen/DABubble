import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { doc, Firestore, setDoc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { collection, CollectionReference, DocumentData, DocumentReference, getDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import { Channel } from '../interfaces/channel';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dbFs = inject(Firestore);
  channelIds: WritableSignal<string[]> = signal([]);
  channelData: WritableSignal<Channel | null> = signal(null);
  channelPosts: WritableSignal<Post[]> = signal([]) 

  channelsRef: CollectionReference = collection(this.dbFs, 'workspaces', 'DevSpace', 'channels');
  channelRef: DocumentReference;
  postsRef: CollectionReference;

  channelSnapshot = onSnapshot(this.channelsRef, snapshot => {
    const cNames: Array<string> = snapshot.docs.map(doc => doc.id);
    this.channelIds.set(cNames);
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

  async setActiveChannel(channelName: string) {
    this.channelRef = doc(this.channelsRef, channelName);
    const docSnap = await getDoc(this.channelRef);
    if(docSnap.exists()) {
      const data: DocumentData = docSnap.data();
      const convertedData: Channel = {
        channelName: data['channelName'],
        creatorName: data['creatorName'],
        description: data['description']
      }
      this.channelData.set(convertedData)
    } 
}

async updateUserDoc(collection: string, id: string, data: any){
  const docRef = doc(this.dbFs, collection, id)
  const newData = data
  await updateDoc(docRef, newData)
}

}
