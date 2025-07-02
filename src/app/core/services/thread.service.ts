import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  postText = signal<string | null>(null);

  setPostText(text: string) {
    this.postText.set(text);
  }}