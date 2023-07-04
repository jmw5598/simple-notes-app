import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-debounced-search',
  templateUrl: './debounced-search.component.html',
  styleUrls: ['./debounced-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class SnDebouncedSearchComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  private _searchTextChangeSubject: Subject<string>

  @Input()
  public debounceTime: number = 250;

  @Input()
  public isSearching: boolean;

  @Output()
  public onSearch: EventEmitter<string>;

  public searchTerm: string;
  public isInputShown: boolean;

  constructor() {
    this.onSearch = new EventEmitter<string>();
    this._searchTextChangeSubject = new Subject<string>();
    this._subscriptionSubject = new Subject<void>();
    this.searchTerm = '';
    this.isSearching = false;
    this.isInputShown = false;
  }

  ngOnInit(): void {
    this._searchTextChangeSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(search => this.search(search)),
        takeUntil(this._subscriptionSubject),
      ).subscribe();
  }

  public onSearchInputKeyUp($event): void {
    const searchTerm: string = $event.target.value.trim();
    this._searchTextChangeSubject.next(searchTerm);
  }

  public search(searchTerm: string): void {
    this.onSearch.emit(searchTerm);
  }

  public onToggleSearchInput(): void {
    this.isInputShown = !this.isInputShown;
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
