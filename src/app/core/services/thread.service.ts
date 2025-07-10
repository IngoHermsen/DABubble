import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  // === Signal ===
  postText = signal<string | null>(null);
  postId = signal<string | null>(null);
  postCreatorImg = signal<string | null> (null)
  postCreatorName = signal<string | null> (null)
  timeAsString = signal<string | null> (null)
  

  // === Signal Setter Method ===
  
  
  
  setPostText(text: string) {
    this.postText.set(text);
  }

  
  setPostId(id: string){
    this.postId.set(id)
  }


  setCreatorImg(path: string){
    this.postCreatorImg.set(path)
  }

  setCreatorName(name: string){
    this.postCreatorName.set(name)
  }

  setTimeString(time:string){
    this.timeAsString.set(time)
  }

  setPostCreatorImg(img:string){
    this.postCreatorImg.set(img)
  }


 // === Methods ===

  logCurrentId(){
    console.log(this.postId());
  }


}

