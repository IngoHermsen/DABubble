import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { Post } from '../core/interfaces/post';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent, EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ThreadService } from '../core/services/thread.service';
import { ViewService } from '../core/services/view.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PickerComponent, EmojiComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  // === Injected Services ===

  public threadService = inject(ThreadService);
  public viewService = inject(ViewService);

  // === Local Data ===

  uid: string = '1234'; // For testing purpose. Will later come from the logged-in user via user.service

  showPostMenu: boolean;
  showEmojiMart: boolean;

  // === Input / Output ===

  @Input() index: number;
  @Input() post: Post;

  // === ViewModel ===

  isOdd: boolean;

  // === State Management ===

  userIdx: number | null = null;
  reactionIdx: number | null = null;

  // === Event Handlers ===

  @HostListener('mouseenter') onMouseEnter() {
    this.showPostMenu = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showPostMenu = false;
  }

  // === Lifecycle ===

  ngOnInit(): void {
    this.isOdd = this.index % 2 !== 0;
    this.showPostMenu = false;
    this.showEmojiMart = false;
  }

  // === Form Handling ===

  /**
   * Handles the click on an emoji.
   * 
   * - Checks whether the emoji reaction already exists.
   * - If yes, toggles the user inside the existing reaction.
   * - If no, creates a new reaction with this emoji.
   * - Hides the emoji picker afterward.
   * 
   * @param event Emoji click event from emoji-mart.
   */
  handleEmojiClick(event: EmojiEvent) {
    const emoji = event.emoji;
    const emojiId = emoji.id;

    if (this.reactionExists(emojiId)) {
      const reaction = this.post.reactions[this.reactionIdx || 0];
      const reactingUsers = reaction.users;
      this.handleUser(reactingUsers);
    } else {
      this.addReaction(emojiId);
    }

    this.showEmojiMart = false;
  }

  /**
   * Handles a click on an existing reaction.
   * 
   * - Removes or adds the user depending on existence.
   * 
   * @param idx Index of the clicked reaction.
   */
  handleReactionClick(idx: number) {
    const reaction = this.post.reactions[idx];
    const reactingUsers: string[] = reaction.users;

    if (this.userExists(reactingUsers)) {
      this.removeUserFromReaction(reactingUsers, idx);
    } else {
      this.addUserToReaction(reactingUsers);
    }
  }

  // === Business Logic ===

  /**
   * Adds the user to a reaction if not already present.
   * 
   * @param reactingUsers Array of user IDs reacting with the emoji.
   */
  handleUser(reactingUsers: string[]) {
    if (!this.userExists(reactingUsers)) {
      this.addUserToReaction(reactingUsers);
    }
  }

  /**
   * Checks whether the given emoji already exists in the post reactions.
   * 
   * @param emojiId The ID of the emoji to check.
   * @returns True if a reaction with the given emoji exists.
   */
  reactionExists(emojiId: string): boolean {
    const reactions = this.post.reactions;
    this.reactionIdx = reactions.findIndex(reaction => reaction.reactionId === emojiId);
    return this.reactionIdx > -1;
  }

  /**
   * Checks if the current user has already reacted.
   * 
   * @param reactingUsers The list of user IDs who reacted with an emoji.
   * @returns True if the current user exists in the list.
   */
  userExists(reactingUsers: string[]): boolean | number {
    this.userIdx = reactingUsers.indexOf(this.uid);
    return this.userIdx > -1;
  }

  /**
   * Removes the current user from the given reaction.
   * 
   * - If the reaction is now empty, it will be removed entirely.
   * 
   * @param reactingUsers List of user IDs in the reaction.
   * @param idx Index of the reaction in the array.
   */
  removeUserFromReaction(reactingUsers: string[], idx: number) {
    // Will be replaced by observable/signal once post data comes from Firebase
    if (this.userIdx !== null) {
      reactingUsers.splice(this.userIdx, 1);
    }

    this.handleReactionState(idx);
  }

  /**
   * Adds the current user to a given list of reacting users.
   * 
   * @param reactingUsers List of user IDs reacting with the emoji.
   */
  addUserToReaction(reactingUsers: string[]) {
    // Will be replaced by observable/signal once post data comes from Firebase
    reactingUsers.push(this.uid);
  }

  /**
   * Adds a new emoji reaction with the current user.
   * 
   * @param emojiId The ID of the emoji to add.
   */
  addReaction(emojiId: string) {
    const reactions = this.post.reactions;
    const reactionObj = {
      reactionId: emojiId,
      users: [this.uid]
    };

    reactions.push(reactionObj);
  }

  /**
   * Removes the entire reaction if it no longer contains any users.
   * 
   * @param idx Index of the reaction to check.
   */
  handleReactionState(idx: number) {
    if (this.post.reactions[idx].users.length === 0) {
      this.post.reactions.splice(idx, 1);
    }
  }

  // === Navigation ===

  /**
   * Opens the thread view for this post.
   * 
   * - Sets the active thread ID.
   * - Enables the thread section in the view service.
   */
  openThread() {
    this.threadService.activeThreadId.set(this.post.postId);
    this.viewService.showThreadSection = true;
  }

  // === Computed Properties ===

  /**
   * Returns the post creation time as a localized string.
   * 
   * - Format: "HH:MM Uhr" in German locale.
   */
  get timeAsString(): string {
    const creationTime: Date = this.post.creationTime.toDate();
    const timeAsString: String = creationTime.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return timeAsString + ' Uhr';
  }

  // === Cleanup ===

}
