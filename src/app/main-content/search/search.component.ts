import { AfterViewInit, Component, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../core/services/firestore.service';

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


  searchTerm: string = "";

  // === Observables ===

  searchTerms$ = new Subject<string>();


  // === Lifecycle Hooks ===

  ngAfterViewInit(): void {
    this.searchTerms$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.firestoreService.getChannelQueryResult(term))
    ).subscribe(result => {
      console.log('Snapshot result', result)
    })

  }

  // === Functions ===
  
  InputOnBlur() {
    this.searchTerms$.next(this.searchTerm);
  }
}
