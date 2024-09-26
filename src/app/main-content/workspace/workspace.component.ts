import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NgClass],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {
    showChannelEntries: boolean = true;
    showDirectMsgEntries: boolean = true; 
    channelToggleClicked: boolean = false; 
    directMsgToggleClicked: boolean = false; 

    toggleEntries(content: string) {
        if(content == 'channels') {
          this.channelToggleClicked = true;
          this.showChannelEntries = !this.showChannelEntries;
        } else {
          this.directMsgToggleClicked = true;
          this.showDirectMsgEntries = !this.showDirectMsgEntries;
        }
        console.log(content);
    }
}
