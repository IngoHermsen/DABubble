import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../core/interfaces/post';
import { PostComponent } from '../../post/post.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { DataService } from '../../core/services/data.service';
import { ViewService } from '../../core/services/view.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [PostComponent, MessageInputComponent],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent implements OnInit {
  public dataService = inject(DataService);
  public viewService = inject(ViewService);
  public firestoreService = inject(FirestoreService);
  public route = inject(ActivatedRoute);

  posts: Post[];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const channelId = params.get('id');
      if (channelId) {
        this.firestoreService.setActiveChannel(channelId);
      }
    })
  }

  ngOnDestroy() {
    this.firestoreService.unsubPostsCol();
  }

  addPost(post: Post) {
    this.firestoreService.addPostToFirestore(post);

  }

  createDateDivider(date: Date): string {
    const dateString: string = date.toLocaleDateString('de-DE', {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  
    return dateString
  }


  // posts = [   //examples - will later be fetched from database / backend
  //   {
  //     postId: '12345',
  //     creatorId: 'Max Mustermann',
  //     text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
  //     reactions: [ss
  //       {reactionId: 'grin', users: ['1234', 'user2']},
  //       {reactionId: 'smile', users: ['user1', 'user2']},
  //     ],
  //     creationTime: '12:00',
  //     isAnswer: false,
  //   },
  //   {
  //     postId: '23456',
  //     creatorId: 'Yogi Bär',
  //     text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do. Lorem ipsum Do velit velit aute eu mollit qui minim do.',
  //     reactions: [],
  //     creationTime: '08:59',
  //     isAnswer: false,
  //     imgPath: 'assets/images/testImg/yogi.png'
  //   },
  //   {
  //     postId: '56789',
  //     creatorId: 'Tante Emma',
  //     text: 'Lorem ipsum Do velit velit aute eu mollit qui minim do.',
  //     reactions: [],
  //     creationTime: '14:29',
  //     isAnswer: false,
  //   },


  // ];
}
