import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';
import { MatProgressSpinnerModule, MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize, from, switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { doc, setDoc, updateDoc, WithFieldValue } from "firebase/firestore";
import { FirestoreService } from '../../core/services/firestore.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-edit-avatar',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatProgressSpinner,
    RouterLink,
  ],
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.scss'
})
export class EditAvatarComponent implements OnInit {
  private authService = inject(AuthService);

  private fsService = inject(FirestoreService);
  imgLoading: boolean = false;
  previewImg: string; // contains path string for preview Image
  firebaseUser: any = {};
  placeholderImagePath: string = 'assets/images/avatar_placeholder.png';
  avatarPath: string = "";
  userImg: string | null = null;
  userName: string | null | undefined;

  // set instance of firebase Storage and reference to image path
  fbStorage = getStorage();
  profileImgRef = ref(this.fbStorage, 'profileimages/12345/profile-img');

  avatarImages = [
    "avatar_1_female.png",
    "avatar_2_male.png",
    "avatar_3_male.png",
    "avatar_4_male.png",
    "avatar_5_female.png",
    "avatar_6_male_3.png"
  ];

  constructor() {
    this.previewImg = this.userImg ? this.userImg : this.placeholderImagePath;
  }

/**
 * Getting the current firebaseUser.
 * Ready to be used in this component
 */
  ngOnInit(): void {
    this.authService.firebaseUser$.subscribe(user => {
      this.firebaseUser = user;
      this.userName = user?.displayName;
    });
  }



  uploadImg(event: Event) {
    this.imgLoading = true;
    let inputEl = event.target as HTMLInputElement;

    if (inputEl?.files?.length) {
      const file = inputEl.files[0];

      from(uploadBytes(this.profileImgRef, inputEl.files[0]))
        .pipe(
          switchMap(() => from(getDownloadURL(this.profileImgRef))),
        )
        .subscribe({
          next: (url) => {
            this.previewImg = url;
            this.imgLoading = false;
          },

        });
    }
  }

  
  setPresetAvatar(imgFileName: string) {
    this.previewImg = 'assets/images/' + imgFileName;
    this.authService.updateUserCredentials(this.firebaseUser, "photoURL", this.previewImg);
    this.setAvatarPathFirestore(imgFileName)
  }


  setAvatarPathFirestore(imgFileName:string){
    this.fsService.updateUserDoc("users", this.firebaseUser.email, {photoURL: imgFileName})
  }
}
