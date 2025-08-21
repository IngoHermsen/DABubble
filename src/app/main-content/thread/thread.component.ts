import { AuthService } from '../../core/services/auth.service';
import { Component, effect, inject, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { MessageInputComponent } from '../message-input/message-input.component';
import { PostComponent } from '../../post/post.component';
import { ActivatedRoute } from '@angular/router';
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
export class ThreadComponent implements OnInit {

  // === Dependency Injections ===
  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);
  public dataService = inject(DataService);
  public route = inject(ActivatedRoute);

  // === Local Data ===
    
  @Output() closeThread = new EventEmitter<boolean>();
  // @Output() message = new EventEmitter<Post>();

  
  // === Lifecycle Hook ===
  ngOnInit() {
    
  }


// === Methods ===
  emitCloseEvent() {
    this.closeThread.emit(true);
  }

  addPost(post: Post) {
    this.firestoreService.addPostToThread(post);
  }
}
