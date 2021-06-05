import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OnDemandPreloadOptions } from './on-demand-preload.options';

@Injectable({
  providedIn: 'root'
})
export class OnDemandPreloadService {
  private _stateSource: BehaviorSubject<OnDemandPreloadOptions> = new BehaviorSubject<OnDemandPreloadOptions>(null);

  constructor() { }

  public onStateChange(): Observable<OnDemandPreloadOptions> {
    return this._stateSource.asObservable();
  }

  public startPreload(routePath: string): void {
    const stateMessage: OnDemandPreloadOptions = {
      preload: true,
      routePath: routePath
    };
    this._stateSource.next(stateMessage);
  }
}
