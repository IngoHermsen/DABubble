import { Component, Output } from '@angular/core';
import { Post } from '../../core/interfaces/post';
import { PostComponent } from '../../post/post.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [NgIf, PostComponent],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent {
  posts: Post[] = [   // examples - will later be fetched from database / backend
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
