import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { showHide } from '@sn/shared/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastMessage, ToasterLocation } from './toast-message.model';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'sn-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  animations: [showHide]
})
export class ToasterComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  public messages: ToastMessage[] = [];

  @Input()
  public location: ToasterLocation = 'bottomright';

  constructor(
    private _toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.listenForPushMessage();
    this.listenForPopMessage();
  }

  public dismiss(message: ToastMessage): void {
    this._toasterService.pop(message);
  }

  private listenForPushMessage(): void {
    this._toasterService.onPushMessage()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((message: ToastMessage) => {
        if (message) {
          this._pushNewMessage(message);
        }
      });
  }

  private listenForPopMessage(): void {
    this._toasterService.onPopMessage()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((message: ToastMessage) => {
        if (message) {
          this.messages = this.messages.filter(m => m.id !== message.id);
        }
      });
  }

  private _pushNewMessage(message: ToastMessage): void {
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
