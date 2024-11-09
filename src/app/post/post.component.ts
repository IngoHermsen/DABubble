import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Post } from '../core/interfaces/post';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PickerComponent],
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
    this.isOdd = this.index % 2 !== 0 // Check if index is Odd to get the correct style
    this.showPostMenu = false;
    this.showEmojiMart = false;
  }

  addEmoji(clickEvent: Event) {
    console.log('was here');
  }

}
