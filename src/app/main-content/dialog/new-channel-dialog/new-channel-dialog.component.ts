import { Component, inject } from '@angular/core';
import { ViewService } from '../../../core/services/view.service';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Channel } from '../../../core/interfaces/channel';
import { AuthService } from '../../../core/services/auth.service';
import { FirestoreService } from '../../../core/services/firestore.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-new-channel-dialog',
  standalone: true,
   imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './new-channel-dialog.component.html',
  styleUrl: './new-channel-dialog.component.scss'
})
export class NewChannelDialogComponent {
  // === Dependency Injections ===
  public viewService = inject(ViewService);
  public authService = inject(AuthService);
  public fsService = inject(FirestoreService);
  public dialogRef = inject(MatDialogRef);

  /**
 * Reactive form group used for creating a new channel.
 * 
 * Contains two form controls:
 * - `channelNameInput`: A required text input with a minimum length of 5 characters.
 * - `channelDescInput`: A required text input for the channel description.
 */
  newChannelFormGroup: FormGroup = new FormGroup({
    channelNameInput: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
    channelDescInput: new FormControl<string>('', {
      nonNullable: true,
    })
  });

  /**
   * Handles form submission to create a new channel.
   * 
   * - Retrieves values from the reactive form controls.
   * - Constructs a `Channel` object including the name, description, and a static creator name.
   * - Passes the object to the Firestore service for persistence.
   */
    newChannelSubmit(): void {
      const channelName = this.newChannelFormGroup.get('channelNameInput')!.value;
      const channelDesc = this.newChannelFormGroup.get('channelDescInput')!.value;
  
      const channel: Channel = {
        channelName: channelName,
        description: channelDesc,
        creatorName: this.authService.firebaseUser?.displayName || 'Walter Falter (Gast)'
      };
  
      this.fsService.addChannelToFirestore(channel);
      this.dialogRef.close();
    }

    closeDialog() {

    }

}
