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
  private fsService = inject(FirestoreService);
  private router = inject(Router);
  public viewService = inject(ViewService);
  authService = inject(AuthService);

  avatarPath: string;
  userName: string;
  firebaseUser: FirebaseUser | null;
  userMail: string | null | undefined;



  /**
 * Angular lifecycle hook that runs after component initialization.
 * 
 * Subscribes to the `firebaseUser$` observable from `authService` and sets
 * user-related component properties including display name, avatar path, email,
 * and the full Firebase user object.
 */
  ngOnInit(): void {
    this.authService.firebaseUser$.subscribe(user => {
      this.userName = user?.displayName ?? "Guest";
      this.avatarPath = user?.photoURL ?? "../../assets/images/avatar_placeholder.png";
      this.firebaseUser = user;
      this.userMail = user?.email;
    });

  }


  /**
 * Reactive form group used for creating a new channel.
 * 
 * Contains two form controls:
 * - `channelNameInput`: A required text input with a minimum length of 5 characters.
 * - `channelDescInput`: A required text input for the channel description.
 */
  newChannelFormGroup: FormGroup = new FormGroup({
    channelNameInput: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
    channelDescInput: new FormControl<string>('', {
      nonNullable: true,
    })
  });


  /**
 * Handles form submission to create a new channel.
 * 
 * - Retrieves values from the reactive form controls.
 * - Constructs a `Channel` object including the name, description, and a static creator name.
 * - Passes the object to the Firestore service for persistence.
 */
  newChannelSubmit(): void {
    const channelName = this.newChannelFormGroup.get('channelNameInput')!.value;
    const channelDesc = this.newChannelFormGroup.get('channelDescInput')!.value;

    const channel: Channel = {
      channelName: channelName,
      description: channelDesc,
      creatorName: this.authService.firebaseUser?.displayName || 'Walter Falter (Gast)'
    };

    console.log('firebaseUser', );

    this.fsService.addChannelToFirestore(channel);
    this.viewService.showModal = false;
  }


  /**
   * Logs the user out and navigates back to the login view.
   * 
   * - Calls the `logoutUser()` method from the auth service.
   * - Closes any open modal via the view service.
   * - Redirects the user to the login page.
   */
  handleLogout() {
    this.authService.logoutUser();
    this.viewService.showModal = false;
    this.router.navigate(['main/login']);
  }


  /**
 * Handles updating the user's display name across the application.
 * 
 * - Retrieves the new name from the input element.
 * - Validates that a Firebase user with an email is available.
 * - Updates the user's display name in Firebase Authentication.
 * - Refreshes the local Firebase user observable.
 * - Updates the user document in Firestore.
 * - Updates the local in-memory user cache.
 * - Closes the modal after the update is complete.
 * 
 * @param newNameInput - The HTML input element containing the new display name.
 * @returns A Promise that resolves when all updates are completed.
 */
  async setNewName(newNameInput: HTMLInputElement): Promise<void> {
    const nameValue = newNameInput.value;

    if (!this.isUserValid()) {
      return;
    }

    await this.updateAuthDisplayName(nameValue);
    this.authService.refreshFirebaseUser();
    await this.updateFirestoreUsername(nameValue);
    this.updateLocalUserCache(nameValue);

    this.viewService.showModal = false;
  }


// -----------------------------------------------------------------------------
// Internal helper functions used by `setNewName`
// -----------------------------------------------------------------------------


/**
 * Checks whether a valid Firebase user with an email is available.
 * 
 * @returns `true` if the user and their email exist, otherwise `false`.
 */
private isUserValid(): boolean {
  return !!this.firebaseUser?.email;
}


/**
 * Updates the Firebase Authentication display name for the current user.
 * 
 * @param name - The new display name to set in Firebase Auth.
 * @returns A Promise that resolves once the update is complete.
 */
private async updateAuthDisplayName(name: string): Promise<void> {
  await this.authService.updateUserCredentials(this.firebaseUser!, "displayName", name);
}


/**
 * Updates the corresponding Firestore user document with the new username.
 * 
 * @param name - The new username to store in Firestore.
 * @returns A Promise that resolves once the Firestore document is updated.
 */
private async updateFirestoreUsername(name: string): Promise<void> {
  await this.fsService.updateUserDoc('users', this.firebaseUser!.email!, { username: name });
}


/**
 * Updates the local in-memory cache of users with the new username.
 * 
 * @param name - The new username to apply to the local user object.
 */
private updateLocalUserCache(name: string): void {
  const user = this.fsService.allFsUsersJsonArr.find(u => u.email === this.firebaseUser?.email);
  if (user) {
    user.username = name;
  }
}

}

