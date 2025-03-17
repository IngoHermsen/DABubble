import { Component, effect, inject } from '@angular/core';
import { Post } from '../../core/interfaces/post';
import { PostComponent } from '../../post/post.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { ViewService } from '../../core/services/view.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { Channel } from '../../core/interfaces/channel';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [PostComponent, MessageInputComponent],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent {
  public viewService = inject(ViewService);
  public fsService = inject(FirestoreService)

  channelData: Channel;
  
  constructor() {
    console.log('constructor')
    effect(() => {
        console.log('was here');
        this.fsService.channelData();
    })
  }

  posts: Post[] = [   //examples - will later be fetched from database / backend
    {
      postId: '12345',
      creatorId: 'Max Mustermann',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [
        {reactionId: 'grin', users: ['1234', 'user2']},
        {reactionId: 'smile', users: ['user1', 'user2']},
      ],
      creationTime: '12:00',
      isAnswer: false,
    },
    {
      postId: '23456',
      creatorId: 'Yogi Bär',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do. Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [],
      creationTime: '08:59',
      isAnswer: false,
      imgPath: 'assets/images/testImg/yogi.png'
    },
    {
      postId: '56789',
      creatorId: 'Tante Emma',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [],
      creationTime: '14:29',
      isAnswer: false,
    },


  ];
}
