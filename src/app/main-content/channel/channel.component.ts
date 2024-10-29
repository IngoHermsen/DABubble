import { Component } from '@angular/core';
import { Post } from '../../core/interfaces/post';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent {
  posts: Post[] = [
    {
      postId: 'postid',
      creatorId: 'Max Mustermann',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [],
      creationTime: '12:00',
      isAnswer: false,
    },
    {
      postId: 'postid',
      creatorId: 'Yogi Bär',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [],
      creationTime: '08:59',
      isAnswer: false,
    },
    {
      postId: 'postid',
      creatorId: 'Tante Emma',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [],
      creationTime: '14:29',
      isAnswer: false,
    },


  ];

}
