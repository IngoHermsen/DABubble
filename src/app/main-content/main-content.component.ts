import { AfterViewInit, Component, inject } from '@angular/core';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ThreadComponent } from './thread/thread.component';
import { OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ShowOnHoverDirective } from '../core/directives/show-on-hover.directive';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from '../core/services/dialog.service';
import { ViewService } from '../core/services/view.service';
import { FirestoreService } from '../core/services/firestore.service';
import { RouterOutlet, Router, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ShowOnHoverDirective,
    NgClass,
    WorkspaceComponent,
    ThreadComponent,
    DialogComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  animations: [
    trigger('toggleWorkspace', [
      state(
        'open',
        style({})
      ),
      state(
        'closed',
        style({
          width: '0px',
          display: 'none'
        })
      ),
      transition('open <=> closed', [animate('180ms')]),
    ]),
    trigger('toggleThread', [
      state(
        'open',
        style({})
      ),
      state(
        'closed',
        style({
          width: '0px',
          display: 'none'
        })
      ),
      transition('open <=> closed', [animate('180ms')]),
    ])
  ]
})

export class MainComponent implements OnInit, AfterViewInit {
  public viewService = inject(ViewService);
  public dialogService = inject(DialogService);
  public firestoreService = inject(FirestoreService);
  private authService = inject(AuthService);
  public router = inject(Router);

  avatarPath: any;
  userName: any;

  ngOnInit(): void {
    this.authService.firebaseUser$.subscribe(user => {
      this.userName = user?.displayName ?? "Guest"
      this.avatarPath = user?.photoURL ?? "../../assets/images/avatar_placeholder.png";
      this.subscribeToWorkspaceNavigation();
    });
  }

  ngAfterViewInit() {
    console.log('main component after view init')
    // this.router.navigate(['/workspace'])
  }

  closeThreadSection(event: boolean) {
    this.viewService.showThreadSection = false;
  }

// Show detail section for all /workspace subroutes, but hide it on the base /workspace route
  
  subscribeToWorkspaceNavigation() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects != '/workspace') {
          this.viewService.showDetailSection = true;
        } else {
          this.viewService.showDetailSection = false
        }
      })
  }
}
