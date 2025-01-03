import { Component, inject } from '@angular/core';
import { ChannelComponent } from './channel/channel.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ThreadComponent } from './thread/thread.component';
import { OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ShowOnHoverDirective } from '../core/directives/show-on-hover.directive';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from '../core/services/dialog.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ShowOnHoverDirective, ChannelComponent, WorkspaceComponent, ThreadComponent, DialogComponent],
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
          width: '0px'
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
  public dialogService = inject(DialogService);
  showWorkspaceMenu: boolean = true;
  showThreadSection: boolean = true;
  
  constructor() {
  }

  ngOnInit(): void {}

  closeThreadSection(event: boolean) {
    this.showThreadSection = false;
  }


}
