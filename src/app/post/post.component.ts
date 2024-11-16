import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Post } from '../core/interfaces/post';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent, EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PickerComponent, EmojiComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent implements OnInit {
  uid: string = 'guest1' // for testing purpose, can be delete after a real user service is implemented. 
  showPostMenu: boolean;
  showEmojiPicker: boolean;

  @Input() index: number;
  @Input() post: Post;

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
    this.showEmojiPicker = false;
    localStorage.setItem('userId', this.uid)
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
    return this.post.reactions.findIndex((r) => {
      return r.reactionId == emojiId;
    })
  }

  addNewReaction(emojiId: string, uid: string) {
    this.post.reactions.push(
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
    this.post.reactions[reactionIndex].reactors.push(this.uid);
    console.log(this.post.reactions[reactionIndex])
  }

  removeUserFromReaction(reactionIndex: number) {

  }

  userExists(reactionIndex: number) {
    return this.post.reactions[reactionIndex].reactors.findIndex((userId: any) => {
      return userId == this.uid;
    })
  }

}




