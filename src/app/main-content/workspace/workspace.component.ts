import { Component, effect, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { DialogService } from '../../core/services/dialog.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { Firestore, collection, collectionData, getDocs } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { ViewService } from '../../core/services/view.service';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit {
  public dialogService = inject(DialogService);
  public fsService = inject(FirestoreService);
  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public viewService = inject(ViewService);
  
  private routeSub: Subscription;
  channelNames: string[];

  showChannelEntries: boolean = true;
  showDirectMsgEntries: boolean = false;
  channelToggleClicked: boolean = false;
  directMsgToggleClicked: boolean = false;

  constructor() {
  effect(() => {
      this.channelNames = this.fsService.channelIds();
    })
  }

  ngOnInit(): void {
    this.showChannelEntries = true;
    this.fsService.getAllUsers()
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
