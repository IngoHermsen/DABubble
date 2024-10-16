import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';
import { MatProgressSpinnerModule, MatProgressSpinner} from '@angular/material/progress-spinner';
import { finalize, from, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-avatar',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatProgressSpinner],
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.scss'
})
export class EditAvatarComponent {
  imgLoading: boolean = false;
  previewImg: string; // contains path string for preview Image

  placeholderImagePath: string = 'assets/images/avatar_placeholder.png'
  userImg: string | null = null;

  fbStorage = getStorage();
  profileImgRef = ref(this.fbStorage, 'profileimages/12345/profile-img');

  avatarImages = [
    "avatar_1_female.png",
    "avatar_2_male.png",
    "avatar_3_male.png",
    "avatar_4_male.png",
    "avatar_5_female.png",
    "avatar_6_male_3.png"
  ]

  constructor(
    private firebaseApp: FirebaseApp
   
  ) {
    this.previewImg = this.userImg ? this.userImg : this.placeholderImagePath
  }


  uploadImg(event: Event) {
    this.imgLoading = true;
    let inputEl = event.target as HTMLInputElement;

    if (inputEl?.files?.length) {
      const file = inputEl.files[0];

      from(uploadBytes(this.profileImgRef, inputEl.files[0]))
      .pipe(
        switchMap(() => from(getDownloadURL(this.profileImgRef))),
        finalize(() => this.imgLoading = false)
      )
      .subscribe({
        next: (url) => this.previewImg = url,

      })
    }
  }

  setPresetAvatar(imgFileName: string) {
      this.previewImg = 'assets/images/' + imgFileName;
      
  }

}
