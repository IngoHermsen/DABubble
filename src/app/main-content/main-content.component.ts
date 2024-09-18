import { Component } from '@angular/core';
import { ChannelComponent } from './channel/channel.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ThreadComponent } from './thread/thread.component';
import { OnInit } from '@angular/core';
import { BrowserAnimation}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ChannelComponent, WorkspaceComponent, ThreadComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
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
    if(this.showWorkspaceMenu) {
      
    }

    this.showWorkspaceMenu = !this.showWorkspaceMenu
  }

}
