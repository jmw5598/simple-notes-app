import { Directive, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';

@Directive({
  selector: 'input[snDebounce]'
})
export class SnDebounceDirective implements OnInit, OnDestroy {
  @Input()
  public debounceTime: number;

  @Output()
  public onEvent: EventEmitter<any>;

  private _valueChangedSubject: Subject<any>;
  private _subscriptionSubject: Subject<void>;

  constructor() {
    this.debounceTime = 500;
    this.onEvent = new EventEmitter<any>(); 
    this._valueChangedSubject = new Subject<any>();
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this._valueChangedSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(value => this.emitChange(value)),
        takeUntil(this._subscriptionSubject),
      ).subscribe();
  }

  @HostListener('window:keyup', ['$event'])
  public onKeyUp(event: any): void {
    this._valueChangedSubject.next(event.target.value);
  }

  public emitChange(value: any): void {
    this.onEvent.emit(value);
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
