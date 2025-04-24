import { inject, Injectable, signal, Type, WritableSignal } from '@angular/core';
import { doc, Firestore, setDoc, onSnapshot, updateDoc, getDocs } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, DocumentData, DocumentReference, DocumentSnapshot, getDoc, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Channel, EMPTY_CHANNEL } from '../interfaces/channel';
import { Post } from '../interfaces/post';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dbFs = inject(Firestore);
  private dataService = inject(DataService)

  // signals
  channelIds: WritableSignal<string[]> = signal([]);
  channelPosts: WritableSignal<Post[]> = signal([])


  // references
  channelsColRef: CollectionReference = collection(this.dbFs, 'workspaces', 'DevSpace', 'channels');
  channelDocRef: DocumentReference;
  postsColRef: CollectionReference;
  users: { photoURL: string; username: string }[] = [];


  channelColSnapshot = onSnapshot(this.channelsColRef, snapshot => {
    console.log('CHANNEL SNAPSHOT')
    const cNames: Array<string> = snapshot.docs.map(doc => doc.id);
    this.dataService.channelIds = cNames;
  });


  async addUserToFirestore(userId: string, userData: any) {
    const userDocRef = doc(this.dbFs, `users/${userId}`);
    return await setDoc(userDocRef, userData);
  }

  async setUserDoc(email: string, user: any) {
    await setDoc(doc(this.dbFs, 'users', email), user);
  }


  async addChannelToFirestore(channel: Channel) {
    if (channel.channelName) await setDoc(doc(this.channelsColRef, channel.channelName), channel);
  }

  async addPostToFirestore(post: Post) {
      addDoc(this.postsColRef, post);
  }

  async setActiveChannel(channelName: string) {

    this.channelDocRef = doc(this.channelsColRef, channelName);
    const docSnap = await getDoc(this.channelDocRef);
    if (docSnap.exists()) {
      const data: DocumentData = docSnap.data();
      const convertedData: Channel = {
        channelName: data['channelName'],
        creatorName: data['creatorName'],
        description: data['description']
      }
      this.dataService.channelData = convertedData
      
    }
  }

  async updateUserDoc(collection: string, id: string, data: any) {
    const docRef = doc(this.dbFs, collection, id)
    const newData = data
    await updateDoc(docRef, newData)
  }

async updatePosts(post: Post) {
      this.postsColRef = collection(this.channelDocRef, 'posts');
      await addDoc(this.postsColRef, post);
}

  async getAllUsers() {
    const usersCollection = collection(this.dbFs, 'users');
    const querySnapshot = await getDocs(usersCollection);

    this.users = querySnapshot.docs.map(doc => ({
      photoURL: doc.data()['photoURL'],
      username: doc.data()['username']
    }));
  }

  
}
