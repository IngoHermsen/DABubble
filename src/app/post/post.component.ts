import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Post } from '../core/interfaces/post';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent, EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PickerComponent, EmojiComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  uid: string = '1234' //for testing purpose. this will later be the user id from the logged in user from user.service
  showPostMenu: boolean;
  showEmojiMart: boolean;
  @Input() index: number;
  @Input() post: Post;
  isOdd: boolean;

  // reaction handling
  userIndex: number | null = null;


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

    console.log(this.post.reactions)

  }

  handleEmojiClick(event: EmojiEvent) {
    const emojiObj = event.emoji;
    this.post.reactions.push(emojiObj);
    this.showEmojiMart = !this.showEmojiMart;
  }

  handleReactionClick(event: Event, idx: number) {
    const reactionsObj = this.post.reactions[idx];
    const reactingUsers: string[] = reactionsObj.users;

    if (!this.userExists(this.uid, reactingUsers)) {
      this.addUserToReaction(reactingUsers)
    } else {
      this.removeUserFromReaction(reactingUsers)
    }
  }

  reactionExists(): boolean {
    return true;
  }
  userExists(uid: string, reactingUsers: string[]): boolean | number {
    this.userIndex = reactingUsers.indexOf(uid)
    return this.userIndex == -1 ? false : this.userIndex;
  }

  removeUserFromReaction(reactingUsers: string[]) {
    // will be expanded with an observable or signal as soon the post comes from firebase
    if (this.userIndex !== null) {
      reactingUsers.splice(this.userIndex, 0)
    }
  }

  addUserToReaction(reactingUsers: string[]) {
    // will be expanded with an observable or signal as soon the post comes from firebase
    reactingUsers.push(this.uid)
  }


}
