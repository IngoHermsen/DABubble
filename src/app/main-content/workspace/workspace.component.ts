import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { TitleStrategy } from '@angular/router';
import { DialogService } from '../../core/services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NgClass],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {
    public dialogService = inject(DialogService);
    public router = inject(Router);
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

    // Following toogleDialog Function is for testing purposes: 

    toggleDialog() {
      this.dialogService.showDialog = !this.dialogService.showDialog; 
      setTimeout(() => {
        this.dialogService.showDialog = false;
      }, 3000)
    }
}
