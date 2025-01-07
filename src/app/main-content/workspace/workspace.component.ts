import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { DialogService } from '../../core/services/dialog.service';
import { ViewService } from '../../core/services/view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NgClass],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit {
    public dialogService = inject(DialogService);
    public viewService = inject(ViewService);
    public router = inject(Router);

    showChannelEntries: boolean = true;
    showDirectMsgEntries: boolean = false; 
    channelToggleClicked: boolean = false; 
    directMsgToggleClicked: boolean = false; 

    ngOnInit(): void {
        this.showChannelEntries = true;
    }
    

    toggleEntries(content: string) {
        if(content == 'channels') {
          this.channelToggleClicked = true;
          this.showChannelEntries = !this.showChannelEntries;
        } else {
          this.directMsgToggleClicked = true;
          this.showDirectMsgEntries = !this.showDirectMsgEntries;
        }
    }

    // Following toogleDialog Function is for testing purposes: 

    toggleDialog() {
      this.viewService.showDialog = !this.viewService.showDialog; 
      setTimeout(() => {
        this.viewService.showDialog = false;
      }, 3000)
    }
}
