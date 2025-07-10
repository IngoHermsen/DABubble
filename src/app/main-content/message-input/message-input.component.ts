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

  // === Injected Services ===
  private authService = inject(AuthService);

  // === Input / Output ===
  @Output() newPost = new EventEmitter<Post>();

  // === Local Data ===
  focussed: boolean = false;
  minInputLength: number = 5;
  messageInput = new FormControl('');
  post: Post;

  // === Computed Properties ===

  /**
   * Checks whether the message input meets the minimum length requirement.
   * Used for validation in the template.
   */
  get formIsValid(): boolean {
    return (
      this.messageInput.value!.length >= this.minInputLength
    );
  }

  // === Event Handlers ===

  /**
   * Handles keydown events within the input.
   * - Submits the message on Enter key press (without Shift).
   * - Prevents default newline behavior.
   * 
   * @param event - The keyboard event triggered by user input.
   */
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }

      event.preventDefault();
      if (this.formIsValid) this.onSubmit();
    }
  }

  // === Form Handling ===

  /**
   * Submits the current message input.
   * - Builds a Post object from the input.
   * - Emits the post via the output EventEmitter.
   * - Resets the form input field.
   */
  onSubmit() {
    console.log('Firebase User', this.authService.firebaseUser)
    if (this.messageInput.value) {
      const message = this.messageInput.value;
      this.post = {
        postId: '',
        creatorId: this.authService.firebaseUser?.email || 'walter.falter@dabubble.com',
        text: message,
        reactions: [],
        creationTime: Timestamp.fromDate(new Date()),
        isAnswer: false
      };
      this.newPost.emit(this.post);
      this.messageInput.reset('');
    }
  }
}


