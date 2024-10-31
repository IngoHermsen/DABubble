import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../core/interfaces/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input() index: number;
  @Input() post: Post;
  isOdd: boolean;

  ngOnInit(): void {
    this.isOdd = this.index % 2 !== 0 // Check if Index is Odd to get the correct style
    console.log(this.isOdd)
  }

}
