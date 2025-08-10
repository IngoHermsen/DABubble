import { AuthService } from '../../core/services/auth.service';
import { Component, effect, inject, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ThreadService } from '../../core/services/thread.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { MessageInputComponent } from '../message-input/message-input.component';
import { PostComponent } from '../../post/post.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../core/interfaces/post';


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

  // === Dependency Injections ===
  authService = inject(AuthService)
  firestoreService = inject(FirestoreService)
  public dataService = inject(DataService);
  public route = inject(ActivatedRoute);
  threadService = inject(ThreadService);



  // === Local Data ===
  threadId: string | null = '';

  
  @Output() closeThread = new EventEmitter<boolean>();
  // @Output() message = new EventEmitter<Post>();

  
  // === Lifecycle Hook ===
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.threadId = params.get('id');
    });
  }


// === Methods ===
  emitCloseEvent() {
    this.closeThread.emit(true);
  }


  logPost(post: Post){
    const channelName = this.dataService.channelData?.channelName
    const postId = this.threadService.postId()
    this.firestoreService.addThreadToPost(channelName, post)
  }


}

