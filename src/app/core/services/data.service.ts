import { Injectable } from '@angular/core';
import { Channel } from '../interfaces/channel';
import { Post } from '../interfaces/post';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // channel data

  channelIds: string[];
  channelData: Channel | undefined;

  // posts data

  posts: Post[];
  groupedPosts: Array<any>;

  // post methods

  handlePostData(posts: Post[]) {
    const sortedPosts: Post[] = posts.sort((a, b) => {
      if (a.creationTime < b.creationTime) {
        return -1
      } else {
        return 1
      }
    });
    this.groupPostsByDate(sortedPosts)
  }

  private groupPostsByDate(posts: Post[]) {
    const postGroups: Map<string, Post[]> = new Map();

      posts.forEach(post => {
        const transformedDate = this.transformDate(post.creationTime);
        if(!postGroups.has(transformedDate)) {
          postGroups.set(transformedDate, [])
        } 

          postGroups.get(transformedDate)?.push(post);      
      });

      this.groupedPosts = Array.from(postGroups.entries()).map(([date, posts]) => ({
       date,
       posts
      }));
  }

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
