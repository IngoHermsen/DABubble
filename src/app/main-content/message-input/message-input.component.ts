import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../core/interfaces/post';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  @Output() message = new EventEmitter<string>;
  focussed: boolean = false;
  minInputLength: number = 5;
  messageInput = new FormControl('');
  post: Post

  isSendButtonDisabled(): boolean {  //helping method for better overview in template
    return (
      this.messageInput.value!.length < this.minInputLength
    )
  };

  submit() {
    if(this.messageInput.value) this.message.emit(this.messageInput.value);
  }
}
