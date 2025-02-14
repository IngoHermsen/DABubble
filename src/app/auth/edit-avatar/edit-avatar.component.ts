import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';
import { MatProgressSpinnerModule, MatProgressSpinner} from '@angular/material/progress-spinner';
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
export class  EditAvatarComponent implements OnInit {
  private authService =  inject(AuthService)


  imgLoading: boolean = false;
  previewImg: string; // contains path string for preview Image
  firebaseUser: any = {}
  placeholderImagePath: string = 'assets/images/avatar_placeholder.png'
  userImg: string | null = null;
  userName: string | undefined

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
  ]

  constructor() {
    this.previewImg = this.userImg ? this.userImg : this.placeholderImagePath
    
  }
  
  ngOnInit(): void {
    
    this.authService.firebaseUser$.subscribe(user => {
      this.firebaseUser = user
      this.userName = user?.displayName
    })
  }
  

  // 'Upload Image' function: This function is triggered by a change-event on the 'File Upload input' (type 'file')
  // Function first sets the imgLoading-boolean as "true". This boolean is binded to the view, so the user can see that the upload is running.
  // In the function the Input Element variable 'inputEl' is initialized with the html-Element from the passed event.
  // It is used to check if the user selected an actual file. In that case the Observable takes place (from(uploadBytes...))
  
  // Explanation in order of appearance in the code: 
  // The goal of the  observable 'from(uploadBytes)' is to get the selected User File and "write it" to the reference path in the Firebase Storage and then returns the final url that points to the uploaded image.
  // To reach that it passes the values of the ImageRef and the file and after upload process finished, it starts a second observable.
  // That second observable 'from(getDownloadURL...)' takes the result of the upload, and receives the storage reference from the first observable.
  // The second observable returns the final url of the uploaded file.
  
  // Important: The first observable code will not be passed until it is subscribed.
  // For that reason at the end of the second observable there is a ".subscribe" to initialize the code above that part. 
  // The subscribe is an "Observer" that handles the data that comes from its observed observable.
  // the next-method specifies what to do with this data. In our case it sets the previewImg variable to the received url.
  // finally it sets the 'imgLoading'-boolean to 'false' in order the user can see that the upload ist finished and can see the image in the preview.

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

      })
    }
  }

  
  async saveImgPath(){
    if(this.firebaseUser.email != null ){
      const docRef = doc(this.authService.dbFs, "users", this.firebaseUser.email)
      let data = {avatarPath: this.previewImg}
      updateDoc(docRef, data)
    }
  }


  setPresetAvatar(imgFileName: string) {
      this.previewImg = 'assets/images/' + imgFileName;
  }

}
