import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'sn-debounced-search',
  templateUrl: './debounced-search.component.html',
  styleUrls: ['./debounced-search.component.scss']
})
export class DebouncedSearchComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  private _searchTextChangeSubject: Subject<string>

  @Input()
  public debounceTime: number = 700;

  @Input()
  public inputClasses: string;

  @Output()
  public onSearch: EventEmitter<string>;

  public searchTerm: string;

  constructor() {
    this.onSearch = new EventEmitter<string>();
    this._searchTextChangeSubject = new Subject<string>();
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this._searchTextChangeSubject
      .pipe(
        takeUntil(this._subscriptionSubject),
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(search => this.search(search))
      ).subscribe();
  }

  public onSearchInputKeyUp($event): void {
    const searchTerm: string = $event.target.value.trim();
    this._searchTextChangeSubject.next(searchTerm);
  }

  public search(searchTerm: string): void {
    this.onSearch.emit(searchTerm);
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
