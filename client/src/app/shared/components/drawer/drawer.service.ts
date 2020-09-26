import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class DrawerService {
  private _isDrawerVisible: boolean;
  private _closeDrawerSource: BehaviorSubject<boolean>;

  private _contentChangeSource: Subject<Type<any>>;

  constructor() {
    this._isDrawerVisible = false;
    this._closeDrawerSource = new BehaviorSubject<boolean>(this._isDrawerVisible);
    this._contentChangeSource = new Subject<any>();
  }

  public onDrawerVibilityChange(): Observable<boolean> {
    return this._closeDrawerSource.asObservable();
  }

  public onContentChange(): Observable<Type<any>> {
    return this._contentChangeSource.asObservable();
  }

  public setContent(content: Type<any>): void {
    this._contentChangeSource.next(content);
  }

  public show(): void {
    this._isDrawerVisible = true;
    this._closeDrawerSource.next(this._isDrawerVisible);
  }

  public close(): void {
    this._isDrawerVisible = false;
    this._closeDrawerSource.next(this._isDrawerVisible);
  }
}
