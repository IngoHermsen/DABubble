import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  activeThreadId = signal<string>('');

  
  constructor() { }
}
