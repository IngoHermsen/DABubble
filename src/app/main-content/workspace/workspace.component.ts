import { Component, effect, inject, OnInit } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { DialogService } from '../../core/services/dialog.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ViewService } from '../../core/services/view.service';
import { DataService } from '../../core/services/data.service';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Auth, User as FirebaseUser } from '@angular/fire/auth';
import { fsUsers } from '../../core/types/firestore_users';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit {
  public dataService = inject(DataService);
  public dialogService = inject(DialogService);
  public fsService = inject(FirestoreService);
  public router = inject(Router);
  public route = inject(ActivatedRoute);
  authService = inject(AuthService);
  public viewService = inject(ViewService);
  firebaseUser: FirebaseUser | null;


  private routeSub: Subscription;
  channelNames: string[];

  showChannelEntries: boolean = true;
  showDirectMsgEntries: boolean = false;
  channelToggleClicked: boolean = false;
  directMsgToggleClicked: boolean = false;

  usersArray: fsUsers = [];

  constructor() {
  }

  async ngOnInit() {
    this.showChannelEntries = true;
    this.authService.firebaseUser$.subscribe(user => {
      this.firebaseUser = user;
      this.fsService.getAllUsers().then(() => {
        this.usersArray = this.fsService.allFsUsersJsonArr;
        this.sortFilterUsersArr(user)
      });
    });
  }


  sortFilterUsersArr(user: FirebaseUser | null) {
    if (user) {
      this.usersArray = this.usersArray.filter(userJson => userJson.username != user.displayName);
    }
    this.usersArray.sort((a, b) => a.username.localeCompare(b.username));
  }


  toggleEntries(content: string) {
    if (content == 'channels') {
      this.channelToggleClicked = true;
      this.showChannelEntries = !this.showChannelEntries;
    } else {
      this.directMsgToggleClicked = true;
      this.showDirectMsgEntries = !this.showDirectMsgEntries;
    }
  }

  showChannel(channel: string) {

  }


}
