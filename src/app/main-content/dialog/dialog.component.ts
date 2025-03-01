import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewService } from '../../core/services/view.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  public viewService = inject(ViewService);
  
  content: string;

  ngOnInit() {
    this.content = this.viewService.activeDialog;
  }
  
}
