import { Component, effect, inject, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ThreadService } from '../../core/services/thread.service';
import { MessageInputComponent } from '../message-input/message-input.component';
import { PostComponent } from '../../post/post.component';

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
  threadId: string = '';
  threadService = inject(ThreadService)
  public dataService = inject(DataService);

  constructor() {
    effect(() => {
     this.threadId = this.threadService.activeThreadId()
    })
  }
  @Output() closeThread = new EventEmitter<boolean>();
    
    emitCloseEvent() {
      this.closeThread.emit(true)
    }

    //!Testlogger
    logSth(){
      console.log("thread func fires");
    }
    //!Testlogger
  }