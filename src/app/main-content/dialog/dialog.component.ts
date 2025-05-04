import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { ViewService } from '../../core/services/view.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { Channel } from '../../core/interfaces/channel';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink, Router, RouterOutlet } from '@angular/router';

import {
  User as FirebaseUser,
  getAuth,
  updateProfile
} from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  private firestoreService = inject(FirestoreService);
  private router = inject(Router);
  public viewService = inject(ViewService);
  authService = inject(AuthService);

  avatarPath: string;
  userName: string;
  firebaseUser: FirebaseUser | null;
  userMail: string | null | undefined;



  ngOnInit(): void {
    this.authService.firebaseUser$.subscribe(user => {
      this.userName = user?.displayName ?? "Guest";
      this.avatarPath = user?.photoURL ?? "../../assets/images/avatar_placeholder.png";
      this.firebaseUser = user;
      this.userMail = user?.email;
    });

  }


  // new Channel form 

  newChannelFormGroup = new FormGroup({
    channelNameInput: new FormControl<string>('', {
      nonNullable: true, validators: [
        Validators.required,
        Validators.minLength(5)
      ]
    }),
    channelDescInput: new FormControl<string>('', {
      nonNullable: true, validators: [
        Validators.required,
      ]
    })
  });


  newChannelSubmit() {
    const channelName = this.newChannelFormGroup.get('channelNameInput')!.value;
    const channelDesc = this.newChannelFormGroup.get('channelDescInput')!.value;

    const channel: Channel = {
      channelName: channelName,
      description: channelDesc,
      creatorName: 'Hans Wurst'
    };

    this.firestoreService.addChannelToFirestore(channel);

    this.viewService.showModal = false;

  }


  handleLogout() {
    this.authService.logoutUser();
    this.viewService.showModal = false;
    this.router.navigate(['main/login']);
  }


  async setNewName(newName: HTMLInputElement) {
    const nameValue = newName.value;
    if (!this.firebaseUser || !this.firebaseUser.email) {
      return;
    }
    await this.authService.updateUserCredentials(this.firebaseUser, "displayName", nameValue);
    this.authService.refreshFirebaseUser()
    await this.firestoreService.updateUserDoc('users', this.firebaseUser.email!, { username: nameValue });
    let userToUpdate = this.firestoreService.users.find(u => u.email === this.firebaseUser?.email);
    if (userToUpdate) {
      userToUpdate.username = nameValue;
    }

    this.viewService.showModal = false
  }
  
}

