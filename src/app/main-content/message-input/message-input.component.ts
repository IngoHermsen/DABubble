import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../core/interfaces/post';
import { Timestamp } from 'firebase/firestore';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  private authService = inject(AuthService);
  @Output() message = new EventEmitter<Post>;
  focussed: boolean = false;
  minInputLength: number = 5;
  messageInput = new FormControl('');
  post: Post;

  get formIsValid(): boolean {  //helping method for better overview in template
    return (
      this.messageInput.value!.length >= this.minInputLength
    )
  };

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }
  
      event.preventDefault();
      if(this.formIsValid) this.onSubmit()
    }
  }

  onSubmit() {
    if(this.messageInput.value) {
      const message = this.messageInput.value;
      this.post = {
        postId: '',
        creatorId: this.authService.firebaseUser?.displayName || 'Walter Falter (Gast)',
        text: message,
        reactions: [],
        creationTime: Timestamp.fromDate(new Date()),
        isAnswer: false
      }
      this.message.emit(this.post);
      this.messageInput.reset('');
    }
  }
}
