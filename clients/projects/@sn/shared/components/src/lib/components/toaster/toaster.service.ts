import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_TOAST_MESSAGE_OPTIONS, ToastMessage, ToastMessageOptions } from './toast-message.model';

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
export class ToasterService {
  private _pushMessageSource: BehaviorSubject<ToastMessage> = new BehaviorSubject<ToastMessage>(null);
  private _popMessageSource: BehaviorSubject<ToastMessage> = new BehaviorSubject<ToastMessage>(null);

  constructor() { }

  public onPushMessage(): Observable<ToastMessage> {
    return this._pushMessageSource.asObservable();
  }

  public onPopMessage(): Observable<ToastMessage> {
    return this._popMessageSource.asObservable();
  }

  public push(message: string, options?: ToastMessageOptions): void {
    const toastMessage: ToastMessage = {
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

  public pop(toastMessage: ToastMessage): void {
    this._popMessageSource.next(toastMessage);
  }
}
