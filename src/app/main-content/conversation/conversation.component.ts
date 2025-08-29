import { Component, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../core/interfaces/post';
import { PostComponent } from '../../post/post.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { DataService } from '../../core/services/data.service';
import { ViewService } from '../../core/services/view.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

type ConversationType = 'direct-messages' | 'channel';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [PostComponent, MessageInputComponent, RouterLink, NgxSpinnerModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit {
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  // === Injected Services ===
  public dataService = inject(DataService);
  public viewService = inject(ViewService);
  public firestoreService = inject(FirestoreService);
  public route = inject(ActivatedRoute);
  public loadingSpinner = inject(NgxSpinnerService);
  // === Local Data ===
  public conversationOpened: boolean = false;
  public posts: Post[];

  // === Constructor / Injection ===
  constructor() {
    effect(() => {
      const contentReady = this.dataService.conversationContentReady();
      this.handleLoadingState(contentReady);
    });
  }

  // === Lifecycle ===
  /**
   * Initializes the component when it is loaded.
   * - Scrolls to the bottom of the message view.
   * - Subscribes to the route parameter map to detect channel ID changes.
   * - If a channel ID is present: loads data and scrolls to the bottom.
   */
  ngOnInit() {
    this.scrollToBottom();
    this.route.paramMap.subscribe(params => {
      this.dataService.conversationContentReady.set(false);
      const paramType = params.get('type') as ConversationType;
      const paramId = params.get('id')!;
      this.loadContent(paramType, paramId);
      this.scrollToBottom();
    });
  }


  /**
   * Cleans up Firestore listeners when component is destroyed.
   */
  ngOnDestroy() {
    this.firestoreService.unsubPostsCol();
  }


  // === Event Handlers ===
  /**
   * Adds a new post to the current conversation and scrolls down.
   */
  addPost(post: Post) {
    this.firestoreService.addPostToConversation(post);
    setTimeout(() => {
      this.scrollToBottom();
    }, 1);
  }


  // === State Management ===
  /**
   * Handles the display of the loading spinner depending on content readiness.
   */
  handleLoadingState(ready: boolean) {
    if (ready) {
      this.loadingSpinner.hide();
    } else {
      this.loadingSpinner.show();
    }
  }


  // === Helper Methods ===
  /**
   * Scrolls the view smoothly to the bottom of the message list.
   */
  scrollToBottom() {
    setTimeout(() => {
      if (this.scrollAnchor) {
        this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  }


  /**
   * Formats a given date into a localized string used as a visual divider.
   * Example output: "Montag, 17. Juni".
   */
  createDateDivider(date: Date): string {
    const dateString: string = date.toLocaleDateString('de-DE', {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });

    return dateString;
  }


  /**
   * Loads the correct content based on the type (direct messages or channel).
   */
  loadContent(contentType: ConversationType, contentId: string) {
    switch (contentType) {
      case 'direct-messages': 
        this.firestoreService.setActiveChat(contentId);
        break;
      case 'channel': 
        this.firestoreService.setActiveChannel(contentId);
        break;
      default: 
        console.warn(`unbekannter Content Type: ${contentType}`);
    }
  }
}
