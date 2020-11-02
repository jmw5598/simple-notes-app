import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class DrawerService {
  private _isDrawerVisible: boolean;
  private _closeDrawerSource: BehaviorSubject<boolean>;

  private _contentChangeSource: Subject<Type<any>>;
  private _dataChangeSource:  BehaviorSubject<any>;

  constructor() {
    this._isDrawerVisible = false;
    this._closeDrawerSource = new BehaviorSubject<boolean>(this._isDrawerVisible);
    this._contentChangeSource = new Subject<any>();
    this._dataChangeSource = new BehaviorSubject<any>(null);
  }

  public onDrawerVibilityChange(): Observable<boolean> {
    return this._closeDrawerSource.asObservable();
  }

  public onContentChange(): Observable<Type<any>> {
    return this._contentChangeSource.asObservable();
  }

  public onDataChange(): Observable<any> {
    return this._dataChangeSource.asObservable();
  }

  public setData(data: any): void {
    this._dataChangeSource.next(data);
  }

  public show(content: Type<any>, data?: any): void {
    this._contentChangeSource.next(content);
    this._dataChangeSource.next(data);
    this._isDrawerVisible = true;
    this._closeDrawerSource.next(this._isDrawerVisible);
  }

  public close(): void {
    this._isDrawerVisible = false;
    this._closeDrawerSource.next(this._isDrawerVisible);
    this._dataChangeSource.next(null);
    this._contentChangeSource.next(null);
  }
}
