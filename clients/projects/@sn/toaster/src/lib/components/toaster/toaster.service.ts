import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_TOAST_MESSAGE_OPTIONS, SnToastMessage, SnToastMessageOptions } from './toast-message.model';

export function* getIdGenerator() {
  let id: number = (new Date()).getTime();
  while (true) {
    yield id++;
  }
}

export const idGenerator: Generator = getIdGenerator();

@Injectable({
  providedIn: 'root'
})
export class SnToasterService {
  private _pushMessageSource: BehaviorSubject<SnToastMessage> = new BehaviorSubject<SnToastMessage>(null);
  private _popMessageSource: BehaviorSubject<SnToastMessage> = new BehaviorSubject<SnToastMessage>(null);

  constructor() { }

  public onPushMessage(): Observable<SnToastMessage> {
    return this._pushMessageSource.asObservable();
  }

  public onPopMessage(): Observable<SnToastMessage> {
    return this._popMessageSource.asObservable();
  }

  public push(message: string, options?: SnToastMessageOptions): void {
    const toastMessage: SnToastMessage = {
      id: idGenerator.next().value,
      message: message,
      options: {
        ...DEFAULT_TOAST_MESSAGE_OPTIONS,
        ...options
      }
    }
    this._pushMessageSource.next(toastMessage);
    if (toastMessage.options.autoRemove) {
      setTimeout(() => this.pop(toastMessage), toastMessage?.options.duration);
    }
  }

  public pop(toastMessage: SnToastMessage): void {
    this._popMessageSource.next(toastMessage);
  }
}
