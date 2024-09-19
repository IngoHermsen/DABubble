import { Component } from '@angular/core';
import { ChannelComponent } from './channel/channel.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ThreadComponent } from './thread/thread.component';
import { OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ChannelComponent, WorkspaceComponent, ThreadComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  animations: [
    trigger('toggleWorkspace', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0.5,
        })
      ),
      transition('open <=> closed', [animate(1000)]),
      // transition('closed => open', [animate('1s')]),
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
