import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FirestoreService } from '../../core/services/firestore.service';
import { AuthService } from '../../core/services/auth.service';
import { ViewService } from '../../core/services/view.service';
import { DataService } from '../../core/services/data.service';
import { Router, RouterLink } from '@angular/router';
import { User as FirebaseUser } from '@angular/fire/auth';
import { FsUsers } from '../../core/types/firestore_users';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewChannelDialogComponent } from '../dialog/new-channel-dialog/new-channel-dialog.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NgClass, RouterLink, MatDialogModule],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit {

  // === Injected Services ===
  public dataService = inject(DataService);
  public fsService = inject(FirestoreService);
  public router = inject(Router);
  public authService = inject(AuthService);
  public viewService = inject(ViewService);
  public dialog = inject(MatDialog)

  // === Local Data ===
  firebaseUser: FirebaseUser | null;
  channelNames: string[];
  showChannelEntries: boolean = true;
  showDirectMsgEntries: boolean = false;
  channelToggleClicked: boolean = false;
  directMsgToggleClicked: boolean = false;
  usersArray: FsUsers = [];


  // === Lifecycle ===
  /**
   * Initializes the workspace, loads all users
   * and filters/sorts them after the Firebase user is available.
   */
  async ngOnInit() {
    this.showChannelEntries = true;
    this.authService.firebaseUser$.subscribe(user => {
      this.firebaseUser = user;
      this.fsService.getAllUsers().then(() => {
        this.usersArray = this.fsService.allFsUsersJsonArr;
        this.sortFilterUsersArr(user);
      });
    });
  };

  openNewChannelDialog() {
    let dialogRef = this.dialog.open(NewChannelDialogComponent)
  }

  // === State Management ===
  /**
   * Filters out the logged-in user and sorts remaining users alphabetically.
   */
  sortFilterUsersArr(user: FirebaseUser | null) {
    if (user) {
      this.usersArray = this.usersArray.filter(userJson => userJson.username != user.displayName);
    }
    this.usersArray.sort((a, b) => a.username.localeCompare(b.username));
  }


  // === Event Handlers ===
  /**
   * Toggles visibility of channel or direct message entries.
   */
  toggleEntries(content: string) {
    if (content == 'channels') {
      this.channelToggleClicked = true;
      this.showChannelEntries = !this.showChannelEntries;
    } else {
      this.directMsgToggleClicked = true;
      this.showDirectMsgEntries = !this.showDirectMsgEntries;
    }
  }


  /**
   * Starts a direct chat with the selected user.
   */
  startChatWithUser(userMail: any) {
    const userObj = this.usersArray.find(user => user.email == userMail);
    this.dataService.conversationTitle = userObj?.username!;
    this.fsService.initializeChat(userObj);
  }


  /**
   * Opens a channel, closes any active thread,
   * and navigates to the selected channel.
   */
  openChannel(channelName: string) {
    //!Delete
    console.log("Open Channel triggers");
    //!Delete
    this.viewService.closeThread();
    this.router.navigate([`/workspace/channel/${channelName}`]);
  }
}
