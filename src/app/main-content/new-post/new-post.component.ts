import { Component } from '@angular/core';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [MessageInputComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {

}
