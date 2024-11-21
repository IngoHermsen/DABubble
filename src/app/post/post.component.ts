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

    console.log(this.post.reactions)

  }

  addReaction(event: EmojiEvent) {
    const emojiObj = event.emoji;
    this.post.reactions.push(emojiObj);
    this.showEmojiMart = !this.showEmojiMart;
  }

}
