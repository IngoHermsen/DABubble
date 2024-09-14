import { Component } from '@angular/core';
import { ChannelComponent } from './channel/channel.component';
import { ChannelSectionComponent } from './workspace/workspace.component';
import { ThreadComponent } from './thread/thread.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ChannelComponent, ChannelSectionComponent, ThreadComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainComponent {

}
