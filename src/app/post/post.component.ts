import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Post } from '../core/interfaces/post';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
<<<<<<< HEAD
import { EmojiData, EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
=======
import { EmojiEvent, EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
>>>>>>> 67d9caf6a392450284ee828b22dc20356f3305ad

@Component({
  selector: 'app-post',
  standalone: true,
<<<<<<< HEAD
  imports: [PickerComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  showPostMenu: boolean;
  showEmojiMart: boolean; 
  @Input() index: number;
  @Input() post: Post;

=======
  imports: [PickerComponent, EmojiComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent implements OnInit {
  uid: string = 'guest1' // for testing purpose, can be delete after a real user service is implemented. 
  showPostMenu: boolean;
  showEmojiPicker: boolean;
  reactions: any[] = []

  @Input() index: number;
  @Input() post: Post;


>>>>>>> 67d9caf6a392450284ee828b22dc20356f3305ad
  isOdd: boolean;

  @HostListener('mouseenter') onMouseEnter() {
    this.showPostMenu = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showPostMenu = false;
  }

  ngOnInit(): void {
    this.isOdd = this.index % 2 !== 0
    this.showPostMenu = false;
<<<<<<< HEAD
    this.showEmojiMart = false;
  }

  addReaction(event: EmojiEvent) {
    const emojiObj = event.emoji
    this.post.reactions.push(emojiObj);
    this.showEmojiMart = !this.showEmojiMart;
  }

}
=======
    this.showEmojiPicker = false;
    localStorage.setItem('userId', this.uid)
    this.reactions = this.post.reactions
  }

  setReaction(event: EmojiEvent) {
    const emojiId: string = event.emoji.id;
    const reactionIndex: number = this.getReactionIndex(emojiId);
    this.showEmojiPicker = !this.showEmojiPicker;


    if (reactionIndex >= 0) {
      this.changeExistingReaction(reactionIndex)
    } else {
      this.addNewReaction(emojiId, this.uid)
    }
  }

  getReactionIndex(emojiId: string) {
    return this.reactions.findIndex((r) => {
      return r.reactionId == emojiId;
    })
  }

  addNewReaction(emojiId: string, uid: string) {
    this.reactions.push(
      {
        reactionId: emojiId,
        reactors: [uid]
      }
    )

  }

  changeExistingReaction(reactionIndex: number) {
    if (this.userExists(reactionIndex) >= 0) {
      this.removeUserFromReaction(reactionIndex)

    } else {
      this.addUserToReaction(reactionIndex)

    }
  }

  addUserToReaction(reactionIndex: number) {
    const currentReaction = this.reactions[reactionIndex];
    currentReaction.reactors.push(this.uid);
  }

  removeUserFromReaction(reactionIndex: number) {
    
  }

  userExists(reactionIndex: number) {
    return this.reactions
    [reactionIndex].reactors.findIndex((userId: any) => {
      return userId == this.uid;
    })
  }

}




>>>>>>> 67d9caf6a392450284ee828b22dc20356f3305ad
