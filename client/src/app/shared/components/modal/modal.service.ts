import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class ModalService {
  private _isModalVisible: boolean;
  private _closeModalSource: BehaviorSubject<boolean>;

  private _contentChangeSource: Subject<Type<any>>;

  constructor() {
    this._isModalVisible = false;
    this._closeModalSource = new BehaviorSubject<boolean>(this._isModalVisible);
    this._contentChangeSource = new Subject<any>();
  }

  public onModalVibilityChange(): Observable<boolean> {
    return this._closeModalSource.asObservable();
  }

  public onContentChange(): Observable<Type<any>> {
    return this._contentChangeSource.asObservable();
  }

  public setContent(content: Type<any>): void {
    this._contentChangeSource.next(content);
  }

  public show(): void {
    this._isModalVisible = true;
    this._closeModalSource.next(this._isModalVisible);
  }

  public close(): void {
    this._isModalVisible = false;
    this._closeModalSource.next(this._isModalVisible);
  }
}
