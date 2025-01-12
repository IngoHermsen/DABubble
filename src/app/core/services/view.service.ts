import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  showThreadSection: boolean = false;
  showDialog: boolean = false;
  activeContent: string = ''
  

  constructor() { 
    this.activeContent = "channel";
  }

  handleContentView() {

  }
}
