import { Injectable, signal } from '@angular/core';
import { Channel } from '../interfaces/channel';
import { Post } from '../interfaces/post';
import { Timestamp } from 'firebase/firestore';
import { User, EMPTY_USER } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // === Local Data ===
  AuthUserData: User = EMPTY_USER;

  channelIds: string[];
  channelData: Channel | undefined;

  conversationTitle: string;
  conversationPosts: Post[];
  conversationPostsByDate: Array<any>;
  conversationContentReady = signal(false);

  chatData: any;
  chatParticipant: string;

  threadMainPost: Post;
  threadSubPosts: Post[];
  threadContentReady = signal(false);

  profileCardData: User;


  // === Methods ===
  /**
   * Handles an array of posts by sorting them chronologically
   * and grouping them by their creation date.
   * 
   * - Sorts posts in ascending order based on `creationTime`.
   * - Calls `groupPostsByDate` to categorize posts by date.
   * 
   * @param posts Array of Post objects to be handled.
   */
  handlePostData(posts: Post[]) {
    const sortedPosts: Post[] = posts.sort((a, b) => {
      if (a.creationTime < b.creationTime) {
        return -1;
      } else {
        return 1;
      }
    });
    this.groupPostsByDate(sortedPosts);
  }


  // === Helper Methods ===
  /**
   * Groups posts by their transformed date string.
   * 
   * - Converts each post's `creationTime` into a formatted date.
   * - Organizes posts into a map structure by date.
   * - Transforms the map into an array of objects for easier consumption.
   * 
   * @param posts Array of sorted Post objects.
   */
  private groupPostsByDate(posts: Post[]) {
    const postGroups: Map<string, Post[]> = new Map();

    posts.forEach(post => {
      if (post.creationTime instanceof Timestamp) {
        const transformedDate = this.transformDate(post.creationTime);
        if (!postGroups.has(transformedDate)) {
          postGroups.set(transformedDate, []);
        }
        postGroups.get(transformedDate)?.push(post);
      }
    });

    const postGroupsAsArray = Array.from(postGroups.entries()).map(([date, posts]) => ({
      date,
      posts
    }));

    this.conversationPostsByDate = postGroupsAsArray;
    setTimeout(() => {
      this.conversationContentReady.set(true)
    }, 700)
  }


  /**
   * Transforms a Firestore Timestamp into a human-readable date string.
   * 
   * - Converts the timestamp to a Date object.
   * - Formats the date according to German locale with weekday, day and month.
   * 
   * @param timestamp Firestore Timestamp to transform.
   * @returns A localized date string (e.g., "Montag, 03. Juni").
   */
  private transformDate(timestamp: Timestamp) {
    const timestampAsDate = timestamp.toDate();
    const dateAsString = timestampAsDate.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long'
    });
    return dateAsString;
  }
}
