import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../core/interfaces/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  @Input() post: Post;

  ngOnInit(): void {
    console.log(this.post)
  }

}
