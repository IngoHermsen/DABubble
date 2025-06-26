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

  // === Injected Services ===
  private dbFs = inject(Firestore);
  private dataService = inject(DataService);
  private viewService = inject(ViewService);

  // === Firestore References ===
  channelsColRef: CollectionReference = collection(this.dbFs, 'workspaces', 'DevSpace', 'channels');
  channelDocRef: DocumentReference;
  postsColRef: CollectionReference;

  // === Local Data ===
  allFsUsersJsonArr: FsUsers = [];


  // === Unsubscribe Functions ===
  unsubPostsCol: () => void;


  // === Methods ===

  /**
 * Subscribes to real-time updates of the channel collection and stores the channel IDs.
 * 
 * - Uses Firestore’s onSnapshot to listen for changes in the channel collection.
 * - Updates the `channelIds` in the `dataService` whenever the snapshot changes.
 * - Stores the unsubscribe function for later cleanup.
 * 
 * @returns A function to unsubscribe from the Firestore listener.
 */
  unsubChannelsCol: () => void = onSnapshot(this.channelsColRef, snapshot => {
    const cNames: Array<string> = snapshot.docs.map(doc => doc.id);
    this.dataService.channelIds = cNames;
  });


  /**
 * Adds a new user document to the Firestore database.
 * 
 * - Constructs a document reference in the `users` collection using the provided `userId`.
 * - Uses Firestore's `setDoc` to write the given `userData` to the specified document.
 * - Overwrites the document if it already exists.
 * 
 * @param userId - The unique identifier for the user document.
 * @param userData - The data to be stored in the user document.
 * @returns A promise that resolves once the user data has been written to Firestore.
 */
  async addUserToFirestore(userId: string, userData: any) {
    const userDocRef = doc(this.dbFs, `users/${userId}`);
    return await setDoc(userDocRef, userData);
  }


  /**
   * Sets the user document in the Firestore `users` collection using the email as the document ID.
   * 
   * - Builds a document reference under `users/{email}`.
   * - Uses Firestore’s `setDoc` to create or overwrite the document with the provided `user` data.
   * - Suitable for initial user creation or full document replacement.
   * 
   * @param email - The email address used as the Firestore document ID.
   * @param user - The complete user data object to be stored.
   * @returns A promise that resolves once the operation completes.
   */
  async setUserDoc(email: string, user: any) {
    await setDoc(doc(this.dbFs, 'users', email), user);
  }


  /**
   * Adds a new channel document to the Firestore `channels` collection.
   * 
   * - Logs the `channel` object for debugging purposes.
   * - Checks if the `channelName` is defined before proceeding.
   * - Constructs a document reference using `channel.channelName` as the document ID.
   * - Uses `setDoc` to create or overwrite the document with the provided channel data.
   * 
   * @param channel - The channel object containing all necessary data including a valid `channelName`.
   * @returns A promise that resolves once the document is written, or undefined if no `channelName` is provided.
   */
  async addChannelToFirestore(channel: Channel) {
    console.log("channel", channel);
    if (channel.channelName) await setDoc(doc(this.channelsColRef, channel.channelName), channel);
  }


  /**
   * Adds a new post document to the Firestore `posts` collection.
   * 
   * - Uses Firestore’s `addDoc` to create a new document with an auto-generated ID.
   * - Stores the provided `post` data in the `posts` collection.
   * - Does not overwrite any existing documents.
   * 
   * @param post - The post object containing the data to be saved.
   * @returns A promise that resolves with the document reference once the post is added.
   */
  async addPostToFirestore(post: Post) {
    addDoc(this.postsColRef, post);
  }


/**
 * Loads and sets the active channel including its metadata for rendering.
 * 
 * - Fetches the Firestore document for the given channel name.
 * - Converts the raw document data into a typed `Channel` object using the helper `mapDocToChannel()`.
 * - Passes the typed data to the `dataService` to be used in the view layer (e.g. for rendering).
 * - Cleans up any existing post listener to avoid duplicate subscriptions.
 * 
 * @param channelName The ID of the channel to activate.
 * @returns `true` if the channel exists and was set, otherwise `false`.
 */
async setActiveChannel(channelName: string) {
  this.channelDocRef = doc(this.channelsColRef, channelName);
  const docSnap = await getDoc(this.channelDocRef);

  if (!docSnap.exists()) return false;

  const channelDataRemote: DocumentData = docSnap.data();
  const channelDataLocal: Channel = this.mapDocToChannel(channelDataRemote);
  this.dataService.channelData = channelDataLocal;

  if (this.unsubPostsCol) this.unsubPostsCol();
  return true;
}


// === Helper Method ===
/**
 * Maps raw Firestore document data to a typed `Channel` object.
 * 
 * - Helper function used in `setActiveChannel()` to ensure type safety.
 * @param doc The raw Firestore document data.
 * @returns A typed `Channel` object.
*/
mapDocToChannel(doc: DocumentData): Channel {
  return {
    channelName: doc['channelName'],
    creatorName: doc['creatorName'],
    description: doc['description']
  };
}


/**
 * Subscribes to real-time updates of the `posts` collection for the active channel.
 * 
 * - Uses Firestore’s `onSnapshot()` to listen for changes.
 * - Converts each raw Firestore document into a typed `Post` object using `mapDocToPost()`.
 * - Passes the post array to the `dataService`, where it will be used for rendering in the UI.
 */
async setActivePosts() {
  this.postsColRef = collection(this.channelDocRef, 'posts');
  this.unsubPostsCol = onSnapshot(this.postsColRef, snapshot => {
    const posts: Post[] = snapshot.docs.map(doc => this.mapDocToPost(doc.data()));
    this.dataService.handlePostData(posts);
  });
}


// === Helper Method ===
/**
 * Maps raw Firestore document data to a typed `Post` object.
 * 
 * - Helper function used in `setActivePosts()` to ensure type safety.
 * @param doc The raw Firestore document data.
 * @returns A typed `Post` object.
 */
mapDocToPost(doc: DocumentData): Post {
  return {
    creationTime: doc["creationTime"],
    creatorId: doc["creatorId"],
    isAnswer: doc["isAnswer"],
    postId: doc["postId"],
    reactions: doc["reactions"],
    text: doc["text"]
  };
}


  /**
   * Updates an existing document in the specified Firestore collection.
   * 
   * - Constructs a document reference using the given `collection` name and document `id`.
   * - Prepares the `data` to be merged into the existing document.
   * - Uses Firestore’s `updateDoc` to apply the updates.
   * - Fails silently if the document does not exist.
   * 
   * @param collection - The name of the Firestore collection.
   * @param id - The ID of the document to be updated.
   * @param data - The partial data object containing fields to update.
   * @returns A promise that resolves once the update is applied.
   */
  async updateUserDoc(collection: string, id: string, data: any) {
    const docRef = doc(this.dbFs, collection, id);
    const newData = data;
    await updateDoc(docRef, newData);
  }


  /**
   * Retrieves all user documents from the Firestore `users` collection and stores them locally.
   * 
   * - Constructs a reference to the `users` collection.
   * - Fetches all documents using Firestore’s `getDocs`.
   * - Maps each document to a simplified user object containing `email`, `photoURL`, and `username`.
   * - Stores the result in `allFsUsersJsonArr` for further use in the application.
   * 
   * @returns A promise that resolves once all user data has been fetched and processed.
   */
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



