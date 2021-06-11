import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OnDemandPreloadOptions } from './on-demand-preload.options';
import { OnDemandPreloadService } from './on-demand-preload.service';

@Injectable()
export class OnDemandPreloadStrategy implements PreloadingStrategy {
  private _preloadOnDemand$: Observable<OnDemandPreloadOptions>;

  constructor(
    private _onDemandPreloadService: OnDemandPreloadService
   ) {
     this._preloadOnDemand$ = this._onDemandPreloadService.onStateChange();
   }

  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this._preloadOnDemand$
      .pipe(
        mergeMap(preloadOptions => {
          const shouldPreload = this._preloadCheck(route, preloadOptions);
          return shouldPreload ? load() : EMPTY;
        })
      );
  }

  private _preloadCheck(route: Route, preloadOptions: OnDemandPreloadOptions): boolean {    
    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadOptions?.routePath) &&
      preloadOptions?.preload
    );
  }
} 