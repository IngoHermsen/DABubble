import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormsModule, NgForm, Validators, FormGroup } from '@angular/forms';
import { ViewService } from '../../core/services/view.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  public viewService = inject(ViewService);

  content: string;

  // new Channel form 

  newChannelFormGroup = new FormGroup({
    channelNameInput: new FormControl('', [
      Validators.required,
      Validators.minLength(15)
    ]),
    channelDescInput: new FormControl('', [
      Validators.required,
      // Validators.minLength(250)
    ])
  })

  

// channelNameInput = new FormControl('', [
//   Validators.maxLength(20),
//   Validators.required
// ]);
// channelDescriptionInput = new FormControl('Description');


ngOnInit() {
  this.content = this.viewService.activeDialog;

  setInterval(() => {
    console.log(this.newChannelFormGroup.controls.channelNameInput.value)
  }, 3000)
}
  
}
