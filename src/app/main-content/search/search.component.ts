import { AfterViewInit, Component, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../core/services/firestore.service';
import { DataService } from '../../core/services/data.service';

type Scope = 'all' | 'channels' | 'users'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
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
  public dataService = inject(DataService)

  searchTerm: string = "";
  searchResult: string[];

  // === Observable ===

  searchTerms$ = new Subject<string>();

  // === Lifecycle Hooks ===

  ngAfterViewInit(): void {
    this.showResultLists = false;
    this.searchTerms$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      ).subscribe(term => this.getSearchResults(term))
  }

  // === Functions ===

  getSearchResults(term: string) {
    this.setSearchScope(term);
    if (term.length > 0) {
      this.matchingChannels = [];
      this.matchingChannels = this.dataService.channelIds.filter(id => {
        return id.toLocaleLowerCase().startsWith(term);
      })
      console.log(this.matchingChannels)
    }
  }

  setSearchScope(term: string) {
    this.searchScope = 'channels'
  }
}
