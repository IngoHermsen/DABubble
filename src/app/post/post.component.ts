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
  showEmojiMart: boolean; 
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
    this.showEmojiMart = false;
    localStorage.setItem('userId', this.uid)
  }

  addReaction(event: EmojiEvent) {
    this.showEmojiMart = !this.showEmojiMart;
    this.setReactionId(event.emoji.id)
  }

  setReactionId(emojiId: string) {
      const postReactions = this.post.reactions;
    }
  }

  


