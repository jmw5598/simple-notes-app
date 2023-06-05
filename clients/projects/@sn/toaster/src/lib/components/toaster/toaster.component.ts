import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { showHide } from '@sn/shared/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnToastMessage, SnToasterLocation } from './toast-message.model';
import { SnToasterService } from './toaster.service';

@Component({
  selector: 'sn-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class SnToasterComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  public messages: SnToastMessage[] = [];

  @Input()
  public location: SnToasterLocation = 'bottomright';

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _toasterService: SnToasterService
  ) { }

  ngOnInit(): void {
    this.listenForPushMessage();
    this.listenForPopMessage();
  }

  public dismiss(message: SnToastMessage): void {
    this._toasterService.pop(message);
  }

  private listenForPushMessage(): void {
    this._toasterService.onPushMessage()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((message: SnToastMessage) => {
        if (message) {
          this._pushNewMessage(message);
          this._changeDetectorRef.markForCheck();
        }
      });
  }

  private listenForPopMessage(): void {
    this._toasterService.onPopMessage()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((message: SnToastMessage) => {
        if (message) {
          this.messages = this.messages.filter(m => m.id !== message.id);
          this._changeDetectorRef.markForCheck();
        }
      });
  }

  private _pushNewMessage(message: SnToastMessage): void {
    switch (this.location) {
      case 'topleft':
      case 'topright':
        this.messages.unshift(message);
        break;
      case 'bottomleft':
      case 'bottomright':
      default:
        this.messages.push(message);
        break;
    }
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
