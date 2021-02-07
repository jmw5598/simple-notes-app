import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayLoaderService {
  private readonly DELAY: number = 500;
  private _isLoading: boolean = false;
  private _isLoadingSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isLoading);

  constructor() { }

  public onLoadingStateChanges(): Observable<boolean> {
    return this._isLoadingSource.asObservable();
  }

  public setLoadingState(isLoading: boolean): void {
    this._isLoading = isLoading;
    if (isLoading) {
      this._isLoadingSource.next(this._isLoading);
    } else {
      setTimeout(() => this._isLoadingSource.next(this._isLoading), this.DELAY);
    }
  }
}
