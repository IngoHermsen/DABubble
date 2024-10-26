import { Component } from '@angular/core';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent {
  posts: any = [
    {
      userName: "Max Mustermann",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore distinctio, quisquam eligendi dolores error saepe nobis corporis. Quibusdam, nam iste. A possimus quo voluptatem laboriosam fugit totam vero voluptate asperiores."
    },
    {
      userName: "Jochen Müller",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore distinctio, quisquam eligendi dolores error saepe nobis corporis. Quibusdam, nam iste. A possimus quo voluptatem laboriosam fugit totam vero voluptate asperiores."
    },
    {
      userName: "Martina Musterfrau",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore distinctio, quisquam eligendi dolores error saepe nobis corporis. Quibusdam, nam iste. A possimus quo voluptatem laboriosam fugit totam vero voluptate asperiores."

    },
  ]
}
