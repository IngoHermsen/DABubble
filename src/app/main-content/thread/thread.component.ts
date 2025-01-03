import { Component, effect, inject, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ThreadService } from '../../core/services/thread.service';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent {
  threadId: string = '';
  threadService = inject(ThreadService)
  constructor() {
    effect(() => {
     this.threadId = this.threadService.activeThreadId()
    })
  }
  @Output() closeThread = new EventEmitter<boolean>();
    
    emitCloseEvent() {
      this.closeThread.emit(true)
    }
}