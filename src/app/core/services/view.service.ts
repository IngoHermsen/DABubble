import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  showThreadSection: boolean = false;
  showDialog: boolean = false;
  activeContent: string = ''
  

  constructor() { 
    this.activeContent = "directMessages";
  }

  setView(content: string) {
    this.activeContent = content;
    console.log(content)
  }
}
