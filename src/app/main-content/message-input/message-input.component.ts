import { Component } from '@angular/core';
import { PostComponent } from '../../post/post.component';
import { AbstractControl, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [PostComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  focussed: boolean = false;
  minInputLength: number = 20;

  isSendButtonDisabled(): boolean {  //helping method for better overview in template
    return (
    this.messageInput.value!.length < 20
    )
  };

  messageInput = new FormControl('')

}
