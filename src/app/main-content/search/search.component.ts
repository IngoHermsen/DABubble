import { AfterViewInit, Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements AfterViewInit {
  searchTerm: string = "";

  // === Observables ===

  searchTerms$ = new Subject();


  // === Lifecycle Hooks ===

  ngAfterViewInit(): void {
    this.searchTerms$
    .pipe(
      debounceTime(300),
      distinctUntilChanged
      switchMap(term => of)
    )
  }

  // === Functions ===
  
  InputOnBlur() {
    this.searchTerms$.next(this.searchTerm);
  }
}
