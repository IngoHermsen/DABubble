import { Component, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';

  
@Component({
  selector: 'app-edit-avatar',
  standalone: true,
  imports: [],
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.scss'
})
export class EditAvatarComponent {
  fbStorage = getStorage();
  profileImagesRef = ref(this.fbStorage, 'profileimages/12345/profile-img');

  constructor(
    private firebaseApp: FirebaseApp
  ) {
    
  }

  uploadImg(event: Event) {
    let inputEl = event.target as HTMLInputElement
    if(inputEl?.files?.length) {
      	uploadBytes(this.profileImagesRef, inputEl.files[0])
        .then((snapshot) => {
          console.log('upload completed', snapshot);
        })
    }
  }

}
