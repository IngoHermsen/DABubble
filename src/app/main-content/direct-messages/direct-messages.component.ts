import { Component } from '@angular/core';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'app-direct-messages',
  standalone: true,
  imports: [MessageInputComponent],
  templateUrl: './direct-messages.component.html',
  styleUrl: './direct-messages.component.scss'
})
export class DirectMessagesComponent {

}
