import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { SnOverlayContentOptions } from './overlay-content-options.model';
import { DEFAULT_OVERLAY_CONTENT_OPTIONS } from './overlay-content-options.defaults';

@Injectable()
export class SnOverlayContentService {
  private readonly _defaultOptions: SnOverlayContentOptions;
  private _isContentVisible: boolean;
  private _closeContentSource: BehaviorSubject<boolean>;

  private _contentChangeSource: Subject<Type<any>>;
  private _dataChangeSource:  BehaviorSubject<any>;
  private _optionsSource: BehaviorSubject<SnOverlayContentOptions>;

  constructor() {
    this._defaultOptions = DEFAULT_OVERLAY_CONTENT_OPTIONS;
    this._isContentVisible = false;
    this._closeContentSource = new BehaviorSubject<boolean>(this._isContentVisible);
    this._contentChangeSource = new Subject<any>();
    this._dataChangeSource = new BehaviorSubject<any>(null);
    this._optionsSource = new BehaviorSubject<SnOverlayContentOptions>(DEFAULT_OVERLAY_CONTENT_OPTIONS);
  }

  public onVibilityChange(): Observable<boolean> {
    return this._closeContentSource.asObservable();
  }

  public onContentChange(): Observable<Type<any>> {
    return this._contentChangeSource.asObservable();
  }

  public onDataChange(): Observable<any> {
    return this._dataChangeSource.asObservable();
  }

  public onOptionsChange(): Observable<SnOverlayContentOptions> {
    return this._optionsSource.asObservable();
  }

  public setData(data: any): void {
    this._dataChangeSource.next(data);
  }

  public show(content: Type<any>, options?: SnOverlayContentOptions): void {
    const contentOptions: SnOverlayContentOptions = {
      ...this._defaultOptions,
      ...options
    };
    this._contentChangeSource.next(content);
    this._optionsSource.next(contentOptions);
    this._dataChangeSource.next(contentOptions.data);
    this._isContentVisible = true;
    this._closeContentSource.next(this._isContentVisible);
  }

  public close(): void {
    this._isContentVisible = false;
    this._closeContentSource.next(this._isContentVisible);
    this._dataChangeSource.next(null);
    this._contentChangeSource.next(null);
  }
}
