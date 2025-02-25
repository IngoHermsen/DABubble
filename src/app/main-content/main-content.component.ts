import { Component, inject } from '@angular/core';
import { ChannelComponent } from './channel/channel.component';
import { NewPostComponent } from './new-post/new-post.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ThreadComponent } from './thread/thread.component';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ShowOnHoverDirective } from '../core/directives/show-on-hover.directive';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from '../core/services/dialog.service';
import { ViewService } from '../core/services/view.service';
import { FirestoreService } from '../core/services/firestore.service';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ShowOnHoverDirective,
    // ChannelComponent,
    WorkspaceComponent,
    ThreadComponent,
    DialogComponent,
    // DirectMessagesComponent,
    // NewPostComponent,
    RouterOutlet,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  animations: [
    trigger('toggleWorkspace', [
      state(
        'open',
        style({})
      ),
      state(
        'closed',
        style({
          width: '0px',
          display: 'none'
        })
      ),
      transition('open <=> closed', [animate('180ms')]),
    ]),
    trigger('toggleThread', [
      state(
        'open',
        style({})
      ),
      state(
        'closed',
        style({
          width: '0px',
          display: 'none'
        })
      ),
      transition('open <=> closed', [animate('180ms')]),
    ])
  ]
})

export class MainComponent implements OnInit {
  public viewService = inject(ViewService);
  public dialogService = inject(DialogService);
  public firestoreService = inject(FirestoreService)
  private authService =  inject(AuthService)

  constructor() {
  }

  ngOnInit(): void {}

  closeThreadSection(event: boolean) {
    this.viewService.showThreadSection = false;
  }

}
