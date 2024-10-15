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

  avatarImages = [
    "avatar_female_1.png",
    "avatar_female_2.png",
    "avatar_male_1.png",
    "avatar_male_2.png",
    "avatar_male_3.png",
    "avatar_male_4.png"
  ] 

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
