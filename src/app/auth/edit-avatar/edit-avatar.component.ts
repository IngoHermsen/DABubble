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

// === Lifecycle ===

/**
 * Subscribes to the AuthService to retrieve the currently authenticated Firebase user.
 * 
 * - Updates the `firebaseUser` property with the user object.
 * - Extracts the user's display name and stores it in `userName`.
 */
ngOnInit(): void {
  this.authService.firebaseUser$.subscribe(user => {
    this.firebaseUser = user;
    this.userName = user?.displayName;
  });
}

// === Event Handlers ===

/**
 * Handles the image upload event triggered by file input.
 * 
 * - Activates loading indicator.
 * - Uploads the selected file to a predefined Firebase Storage reference.
 * - Retrieves the download URL after upload and updates the `previewImg`.
 * - Deactivates loading indicator after successful upload.
 */
uploadImg(event: Event) {
  this.imgLoading = true;
  let inputEl = event.target as HTMLInputElement;

  if (inputEl?.files?.length) {
    const file = inputEl.files[0];

    from(uploadBytes(this.profileImgRef, file))
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


// === Methods ===

/**
 * Sets a selected avatar image from the predefined list as the profile picture.
 * 
 * - Updates the `previewImg` with the selected image.
 * - Calls AuthService to update the Firebase user's `photoURL`.
 * - Persists the avatar choice to Firestore.
 */
setPresetAvatar(imgFileName: string) {
  this.previewImg = 'assets/images/' + imgFileName;
  this.authService.updateUserCredentials(this.firebaseUser, "photoURL", this.previewImg);
  this.setAvatarPathFirestore(imgFileName);
}


/**
 * Updates the user's Firestore document with the selected avatar image path.
 * 
 * - Targets the `photoURL` field within the user document.
 * - Uses the FirestoreService for document update.
 */
setAvatarPathFirestore(imgFileName: string) {
  this.fsService.updateUserDoc("users", this.firebaseUser.email, { photoURL: imgFileName });
}

}
