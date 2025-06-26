import { AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../core/interfaces/post';
import { PostComponent } from '../../post/post.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { DataService } from '../../core/services/data.service';
import { ViewService } from '../../core/services/view.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [PostComponent, MessageInputComponent, RouterLink],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent implements OnInit {
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  public dataService = inject(DataService);
  public viewService = inject(ViewService);
  public firestoreService = inject(FirestoreService);
  public route = inject(ActivatedRoute);
  public channelOpened: boolean = false;
  posts: Post[];


  
  /**
 * Initializes the component when it is loaded.
 * 
 * - Scrolls to the bottom of the message view.
 * - Activates the `channelUserAction` flag to indicate user-driven channel view.
 * - Subscribes to the route parameter map to detect channel ID changes.
 * - If a channel ID is present:
 *   - Loads channel-specific data.
 *   - Scrolls to the bottom again after data load.
 */
  ngOnInit() {
    this.scrollToBottom();
    this.route.paramMap.subscribe(params => {
      const channelId = params.get('id');
      if (channelId) {
        this.handleChannelData(channelId);
        this.scrollToBottom();
      }
    });
  }


  /**
 * Lifecycle hook that is called when the component is destroyed.
 * 
 * - Unsubscribes from the Firestore posts collection to prevent memory leaks.
 */
  ngOnDestroy() {
    this.firestoreService.unsubPostsCol();
  }


// -----------------------------------------------------------------------------
// Internal helper functions used by `ngOnInit`
// -----------------------------------------------------------------------------

/**
 * Handles the logic for activating a specific channel based on its ID.
 * 
 * - Enables user action and auto-scroll behavior in the view service.
 * - Sets the active channel in the Firestore service.
 * 
 * @param channelId - The ID of the channel to be activated.
 */
  async handleChannelData(channelId: string) {
    const channelExists = await this.firestoreService.setActiveChannel(channelId);
    if(channelExists){
      this.firestoreService.setActivePosts()
    }
  }


  /**
 * Scrolls the view smoothly to the bottom of the message list.
 * 
 * - Waits for 1 second to ensure that all dynamic content (e.g. messages) is rendered.
 * - If the scroll anchor element is available, scrolls to it with a smooth animation.
 */
  scrollToBottom() {
    setTimeout(() => {
      if (this.scrollAnchor) {
        this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  }


  /**
 * Adds a new post to the Firestore collection.
 * 
 * - Marks the action as user-initiated via `viewService.channelUserAction`.
 * - Sends the new post to Firestore.
 * - Scrolls the view to the bottom shortly after adding the post.
 * 
 * @param post - The post object to be added.
 */
  addPost(post: Post) {
    this.firestoreService.addPostToFirestore(post);
    setTimeout(() => {
      this.scrollToBottom();
    }, 1);
  }

  
  /**
 * Formats a given date into a localized string used as a visual divider.
 * 
 * - Converts the date into a human-readable German format with weekday, day, and month.
 * - Example output: "Montag, 17. Juni"
 * 
 * @param date - The date to be formatted.
 * @returns A formatted date string.
 */
  createDateDivider(date: Date): string {
    const dateString: string = date.toLocaleDateString('de-DE', {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });

    return dateString;
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
