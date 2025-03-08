import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { ViewService } from '../../core/services/view.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { Channel } from '../../core/interfaces/channel';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  private firestoreService = inject(FirestoreService);
  public viewService = inject(ViewService);

  content: string;

  // new Channel form 

  newChannelFormGroup = new FormGroup({
    channelNameInput: new FormControl<string>('', {nonNullable: true, validators:[
      Validators.required,
      Validators.minLength(5)
    ] } ),
    channelDescInput: new FormControl<string>('', {nonNullable: true, validators:[
      Validators.required,
    ]})
  })


  ngOnInit() {
    this.content = this.viewService.activeDialog;

  }

  newChannelSubmit() {
    const channelName = this.newChannelFormGroup.get('channelNameInput')!.value;
    const channelDesc = this.newChannelFormGroup.get('channelDescInput')!.value;
    
    const channel: Channel = {
      channelName: channelName,
      description: channelDesc,
      creatorName: 'Hans Wurst'      
    };

    this.firestoreService.addChannelToFirestore(channel);

    this.viewService.showModal = false;

  }

}
