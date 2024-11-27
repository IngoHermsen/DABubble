import { Component } from '@angular/core';
import { Post } from '../../core/interfaces/post';
import { PostComponent } from '../../post/post.component';
import { NgIf } from '@angular/common';
import { MessageInputComponent } from '../message-input/message-input.component';


@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [NgIf, PostComponent, MessageInputComponent],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent {
  posts: Post[] = [   // examples - will later be fetched from database / backend
    {
      postId: 'postid',
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
      postId: 'postid',
      creatorId: 'Yogi Bär',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do. Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [],
      creationTime: '08:59',
      isAnswer: false,
      imgPath: 'assets/images/testImg/yogi.png'
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
