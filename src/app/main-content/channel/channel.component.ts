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
<<<<<<< HEAD
      postId: 'postid',
      creatorId: 'Max Mustermann',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [],
=======
      postId: '23456',
      creatorId: 'Max Mustermann',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [
        { reactionId: 'smiling_face_with_tear', reactors: ['user1', 'user2'] },
        // { reactionId: 'wink', reactors: ['user1', 'user2'] }
      ],
>>>>>>> 67d9caf6a392450284ee828b22dc20356f3305ad
      creationTime: '12:00',
      isAnswer: false,
    },
    {
<<<<<<< HEAD
      postId: 'postid',
=======
      postId: '12345',
>>>>>>> 67d9caf6a392450284ee828b22dc20356f3305ad
      creatorId: 'Yogi Bär',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do. Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [],
      creationTime: '08:59',
      isAnswer: false,
      imgPath: 'assets/images/testImg/yogi.png'
    },
    {
<<<<<<< HEAD
      postId: 'postid',
=======
      postId: '34567',
>>>>>>> 67d9caf6a392450284ee828b22dc20356f3305ad
      creatorId: 'Tante Emma',
      text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
      reactions: [],
      creationTime: '14:29',
      isAnswer: false,
    },


  ];
}
