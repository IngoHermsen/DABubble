import { inject, Injectable, OnInit, signal, Type, WritableSignal } from '@angular/core';
import { doc, Firestore, setDoc, onSnapshot, updateDoc, getDocs } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, DocumentData, DocumentReference, DocumentSnapshot, getDoc, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Channel, EMPTY_CHANNEL } from '../interfaces/channel';
import { Post } from '../interfaces/post';
import { DataService } from './data.service';
import { ViewService } from './view.service';
import { FsUsers } from '../types/firestore_users';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dbFs = inject(Firestore);
  private dataService = inject(DataService);
  private viewService = inject(ViewService)

  // references
  channelsColRef: CollectionReference = collection(this.dbFs, 'workspaces', 'DevSpace', 'channels');
  channelDocRef: DocumentReference;
  postsColRef: CollectionReference;
  allFsUsersJsonArr: FsUsers = [];


  unsubChannelsCol: () => void = onSnapshot(this.channelsColRef, snapshot => {
    const cNames: Array<string> = snapshot.docs.map(doc => doc.id);
    this.dataService.channelIds = cNames;
  });

  unsubPostsCol: () => void;


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
      this.dataService.channelData = convertedData;
      if(this.unsubPostsCol) this.unsubPostsCol();
      this.setActivePosts();
    }
  }

  async setActivePosts() {
    this.postsColRef = collection(this.channelDocRef, 'posts');
    this.unsubPostsCol = onSnapshot(this.postsColRef, snapshot => {
      const posts: Post[] = snapshot.docs.map(doc => {
          this.viewService.channelAutoScroll = true;
          const postData: Post = doc.data() as Post;
          const convertedPost: Post = {
              creationTime: postData.creationTime,
              creatorId: postData.creatorId,
              isAnswer: postData.isAnswer,
              postId: postData.postId,
              reactions: postData.reactions,
              text: postData.text
          }
          return convertedPost;
      })
      this.dataService.handlePostData(posts);
    });
  }

  async updateUserDoc(collection: string, id: string, data: any) {
    const docRef = doc(this.dbFs, collection, id)
    const newData = data
    await updateDoc(docRef, newData)
  }


  async getAllUsers() {
    const usersCollection = collection(this.dbFs, 'users');
    const querySnapshot = await getDocs(usersCollection);

    this.allFsUsersJsonArr = querySnapshot.docs.map(doc => ({
      email: doc.id,
      photoURL: doc.data()['photoURL'],
      username: doc.data()['username']
    }));

  }
 
  unsubChannelSnapshot() {
    
  }

}



