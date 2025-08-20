import { Component, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../core/interfaces/post';
import { PostComponent } from '../../post/post.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { DataService } from '../../core/services/data.service';
import { ViewService } from '../../core/services/view.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

type ConversationType = 'direct-messages' | 'channel'

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [PostComponent, MessageInputComponent, RouterLink, NgxSpinnerModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit {
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  // === Dependency Injections ===
  public dataService = inject(DataService);
  public viewService = inject(ViewService);
  public firestoreService = inject(FirestoreService);
  public route = inject(ActivatedRoute);
  public loadingSpinner = inject(NgxSpinnerService);


  // === Local Data ===
  public conversationOpened: boolean = false;
  public posts: Post[];

  constructor() {
    effect(() => {
      const contentReady = this.dataService.conversationContentReady();
      this.handleLoadingState(contentReady)
    })
  }

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
    this.dataService.conversationContentReady.set(false);
      const paramType = params.get('type') as ConversationType;
      const paramId = params.get('id')!;
      this.loadContent(paramType, paramId)
      this.scrollToBottom();
    });
    
  }


  ngOnDestroy() {
    this.firestoreService.unsubPostsCol();
  }


  // -----------------------------------------------------------------------------
  // Internal helper functions used by `ngOnInit`
  // -----------------------------------------------------------------------------


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

  addPost(post: Post) {
    this.firestoreService.addPostToConversation(post);
    setTimeout(() => {
      this.scrollToBottom();
    }, 1);
  }


  /**
 * Formats a given date into a localized string used as a visual divider.
 * 
 * - Converts the date into a human-readable format with weekday, day, and month.
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
  };

  loadContent(contentType: ConversationType, contentId: string) {
    switch (contentType) {
      case 'direct-messages': this.firestoreService.setActiveChat(contentId)
        break;
      case 'channel': this.firestoreService.setActiveChannel(contentId);
        break;
      default: console.warn(`unbekannter Content Type: ${contentType}`)
    }
  }

  handleLoadingState(ready: boolean) {
    if(ready) {
      this.loadingSpinner.hide();
    } else {
      this.loadingSpinner.show()
    }
  }

}
