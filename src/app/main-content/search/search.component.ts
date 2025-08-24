import { AfterViewInit, Component, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, first, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../core/services/firestore.service';
import { DataService } from '../../core/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

type Scope = Array<'channels' | 'users'>

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements AfterViewInit {
  showResultLists: boolean = false;

  // === Search Results ===
  searchScope: Scope;
  hasPrefix: boolean = false;

  matchingChannels: string[];
  matchingUsers: any[];

  // === Dependency Injections ===
  public firestoreService = inject(FirestoreService);
  public dataService = inject(DataService);
  public router = inject(Router);
  public activatedRoute = inject(ActivatedRoute)

  searchTerm: string = "";
  searchResult: string[];

  // === Observable ===

  searchTerms$ = new Subject<string>();

  // === Lifecycle Hooks ===

  ngAfterViewInit(): void {
    this.matchingChannels = [];
    this.matchingUsers = [];
    this.searchScope = ['channels', 'users'];

    this.searchTerms$
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
      ).subscribe(term => this.handleSearchTerm(term.toLowerCase()));
  }

  // === Functions ===

  handleSearchTerm(term: string) {
    this.matchingChannels = [];
    this.matchingUsers = [];
    this.setPrefix(term);
    if (this.hasPrefix) {
      this.getSearchResults(term.substring(1))
    } else {
      this.getSearchResults(term);
    }
  }

  setPrefix(term: string) {
    const [ firstChar ] = term;
    switch (firstChar) {
      case '@': this.searchScope = ['users'], this.hasPrefix = true;
        break;
      case '#': this.searchScope = ['channels'], this.hasPrefix = true;
        break;
      default: this.searchScope = ['channels', 'users'], this.hasPrefix = false;
    };
  }

  hideResultsWithDelay() {
    setTimeout(() => {
      this.showResultLists = false;
    }, 300)
  };

  getSearchResults(term: string) {
    if (term.length > 0 && this.searchScope.includes('channels')) {
      this.matchingChannels = this.dataService.channelIds.filter(id => {
        return id.toLocaleLowerCase().startsWith(term);
      })
    };

    if (term.length > 0 && this.searchScope.includes('users')) {
      this.matchingUsers = this.firestoreService.allFsUsersJsonArr.filter(user => {
        return user.username.toLocaleLowerCase().startsWith(term);
      });
      console.log('matchingUsers:', this.matchingUsers)
    }
  }

  handleChannelClick(channel: string) {
    this.searchTerm = '';
    this.searchTerms$.next('');
    this.router.navigate([`workspace/channel/${channel}`])
  }

  handleUserClick(user: any) {
    this.searchTerm = '';
    this.searchTerms$.next('');
    console.log(user)
  }
}
