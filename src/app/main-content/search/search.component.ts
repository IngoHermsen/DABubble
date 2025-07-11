import { AfterViewInit, Component, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../core/services/firestore.service';
import { DataService } from '../../core/services/data.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

type Scope = Array<'channels' | 'users'>

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements AfterViewInit {
  showResultLists: boolean = false;

  // === Search Results ===
  searchScope: Scope;
  matchingChannels: string[];
  matchingUsers: string[];

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
    this.searchScope = ['channels', 'users']

    this.searchTerms$
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
      ).subscribe(term => this.getSearchResults(term.toLowerCase()));
    
  }

  // === Functions ===

  getSearchResults(term: string) {

    this.setSearchScope(term);
    if (term.length > 0) {
      this.matchingChannels = [];
      this.matchingChannels = this.dataService.channelIds.filter(id => {
        return id.toLocaleLowerCase().startsWith(term);
      })

    }
  }

  setSearchScope(term: string) {
    switch(term.charAt(0)) {
      case '@': this.searchScope = ['users'];
      break;
      case '#': this.searchScope = ['channels'];
      break;
      default: this.searchScope = ['channels', 'users'];
    }
  }

  hideResultsWithDelay() {
    setTimeout(() => {
      this.showResultLists = false;
    }, 300)
  }
}
