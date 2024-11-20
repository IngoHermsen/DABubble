import { Component } from '@angular/core';
import { ChannelComponent } from './channel/channel.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ThreadComponent } from './thread/thread.component';
import { OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ShowOnHoverDirective } from '../core/directives/show-on-hover.directive';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ShowOnHoverDirective, ChannelComponent, WorkspaceComponent, ThreadComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  animations: [
    trigger('toggleWorkspace', [
      state(
        'open',
        style({
        })
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
  showWorkspaceMenu: boolean = false;

  constructor() {
    this.showWorkspaceMenu = true;
    console.log(this.showWorkspaceMenu)
  }

  ngOnInit(): void {

  }

  toggleWorkspace() {

  }


}
