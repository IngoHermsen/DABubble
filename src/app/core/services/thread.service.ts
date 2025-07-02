import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  // === Signal ===
  postText = signal<string | null>(null);
  postId = signal<string | null>(null);
  

  // === Signal Setter Method ===
  setPostText(text: string) {
    this.postText.set(text);
  }

  
  setPostId(id: string){
    this.postId.set(id)
  }
}

