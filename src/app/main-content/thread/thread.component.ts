import { Component, effect, inject, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ThreadService } from '../../core/services/thread.service';
import { MessageInputComponent } from '../message-input/message-input.component';
import { PostComponent } from '../../post/post.component';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [
    MessageInputComponent,
    PostComponent
  ],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent {

  // === Injected Services ===
  threadService = inject(ThreadService);
  public dataService = inject(DataService);
  public route = inject(ActivatedRoute);


  // === Local Data ===
  threadId: string | null = '';

  @Output() closeThread = new EventEmitter<boolean>();

  emitCloseEvent() {
    this.closeThread.emit(true);
  }

  // === Lifecycle Hook ===
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.threadId = params.get('id');
      setTimeout(() => {
        console.log("Hello I am from thread the Id", this.threadId);
        
      }, 2000);
    });
  }

}

