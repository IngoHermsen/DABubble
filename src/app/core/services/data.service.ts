import { Injectable } from '@angular/core';
import { Channel } from '../interfaces/channel';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // channel data

  channelIds: string[];
  channelData: Channel;
  
  // posts data

  posts: Post[];
}
