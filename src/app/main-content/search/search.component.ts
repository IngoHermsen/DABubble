import { AfterViewInit, Component, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../core/services/firestore.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements AfterViewInit {
  // === Dependency Injections ===
  public firestoreService = inject(FirestoreService);
  public dataService = inject(DataService)

  searchTerm: string = "";
  searchResult: string[];

  // === Observable ===

  searchTerms$ = new Subject<string>();

  // === Lifecycle Hooks ===

  ngAfterViewInit(): void {
    this.searchTerms$
    .pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(term => this.getSearchResults(term))
  }

  // === Functions ===

  getSearchResults(term: string) {
    // const channelResults: [] = 
    // const channelResults = this.dataService.channelIds.filter()
  }
}
