import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../core/interfaces/post';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  @Output() message = new EventEmitter<Post>;
  focussed: boolean = false;
  minInputLength: number = 5;
  messageInput = new FormControl('');
  post: Post;

  isSendButtonDisabled(): boolean {  //helping method for better overview in template
    return (
      this.messageInput.value!.length < this.minInputLength
    )
  };

  onSubmit() {
    if(this.messageInput.value) {
      const message = this.messageInput.value;
      this.post = {
        postId: '',
        creatorId: 'Hans Wurst',
        text: message,
        reactions: [],
        creationTime: 'irgendwann',
        isAnswer: false
      }
      this.message.emit(this.post);
      this.messageInput.reset('');
    }
  }
}
