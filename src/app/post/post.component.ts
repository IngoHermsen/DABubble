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
  public threadService = inject(ThreadService);
  public viewService = inject(ViewService);

  uid: string = '1234' //for testing purpose. this will later be the user id from the logged in user from user.service
  showPostMenu: boolean;
  showEmojiMart: boolean;

  @Input() index: number;
  @Input() post: Post;
  isOdd: boolean;

  // reaction handling
  userIdx: number | null = null;
  reactionIdx: number | null = null;

  @HostListener('mouseenter') onMouseEnter() {
    this.showPostMenu = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showPostMenu = false;
  }

  ngOnInit(): void {
    this.isOdd = this.index % 2 !== 0
    this.showPostMenu = false;
    this.showEmojiMart = false;
  }

  handleEmojiClick(event: EmojiEvent) {
    const emoji = event.emoji;
    const emojiId = emoji.id;

    if (this.reactionExists(emojiId)) {
      const reaction = this.post.reactions[this.reactionIdx || 0];
      const reactingUsers = reaction.users;
      this.handleUser(reactingUsers);
    } else {
      this.addReaction(emojiId)
    }

    this.showEmojiMart = false;

  }

  handleReactionClick(idx: number) {
    const reaction = this.post.reactions[idx];
    const reactingUsers: string[] = reaction.users;

    if (this.userExists(reactingUsers)) {
      this.removeUserFromReaction(reactingUsers, idx);
    } else {
      this.addUserToReaction(reactingUsers);
    }

  }

  handleUser(reactingUsers: string[]) {
    if (!this.userExists(reactingUsers)) {
      this.addUserToReaction(reactingUsers);
    }
  }

  reactionExists(emojiId: string): boolean {
    const reactions = this.post.reactions;
    this.reactionIdx = reactions.findIndex(reaction => reaction.reactionId === emojiId)
    return this.reactionIdx > -1 ? true : false;
  }

  userExists(reactingUsers: string[]): boolean | number {
    this.userIdx = reactingUsers.indexOf(this.uid);
    return this.userIdx > -1 ? true : false;
  }

  removeUserFromReaction(reactingUsers: string[], idx: number) {
    // will be expanded with an observable or signal as soon the post comes from firebase
    if (this.userIdx !== null) {
      reactingUsers.splice(this.userIdx, 1)
    }

    this.handleReactionState(idx)
  }

  addUserToReaction(reactingUsers: string[]) {
    // will be expanded with an observable or signal as soon the post comes from firebase
    reactingUsers.push(this.uid)
  }

  addReaction(emojiId: string) {
    const reactions = this.post.reactions;

    const reactionObj = {
      reactionId: emojiId, users: [this.uid]
    }

    reactions.push(reactionObj);
  }

  handleReactionState(idx: number) {

    if (this.post.reactions[idx].users.length == 0) {
      this.post.reactions.splice(idx, 1);
    }
  }

  openThread() {
    this.threadService.activeThreadId.set(this.post.postId);
    this.viewService.showThreadSection = true;
  }

  
  get timeAsString(): string {
    const creationTime: Date = this.post.creationTime.toDate();
    const timeAsString: String = creationTime.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    })
    return timeAsString + ' Uhr';
  }
}
