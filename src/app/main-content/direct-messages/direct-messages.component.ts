import { Component, inject, Input, OnInit } from '@angular/core';
import { MessageInputComponent } from '../message-input/message-input.component';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-direct-messages',
  standalone: true,
  imports: [MessageInputComponent],
  templateUrl: './direct-messages.component.html',
  styleUrl: './direct-messages.component.scss'
})
export class DirectMessagesComponent implements OnInit {
// === Dependendy Injections ===

  public dataService = inject(DataService); 

  ngOnInit() {
  }
}
