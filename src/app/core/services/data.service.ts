import { Injectable } from '@angular/core';
import { Channel } from '../interfaces/channel';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // channel data

  channelIds: string[];
  channelData: Channel;
  
}
