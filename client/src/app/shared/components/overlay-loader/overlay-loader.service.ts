import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayLoaderService {
  private _isLoading: boolean = false;
  private _isLoadingSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isLoading);

  constructor() { }

  public onLoadingStateChanges(): Observable<boolean> {
    return this._isLoadingSource.asObservable();
  }

  public setLoadingState(isLoading: boolean): void {
    this._isLoading = isLoading;
    this._isLoadingSource.next(this._isLoading);
  }
}
