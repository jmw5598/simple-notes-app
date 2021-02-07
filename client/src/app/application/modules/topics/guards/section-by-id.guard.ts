import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Section } from '@sn/shared/models';
import { getSectionById } from '../store/actions';
import { selectSelectedSection } from '../store/selectors';
import { ITopicsState } from '../store/reducers';
import { OverlayLoaderService } from '@sn/shared/components';

@Injectable({
  providedIn: 'root'
})
export class SectionByIdGuard implements CanActivate {
  constructor(
    private _overlayLoaderService: OverlayLoaderService,
    private _store: Store<ITopicsState>
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    this._overlayLoaderService.setLoadingState(true);
    const topicId: number = +next.paramMap.get('topicId');
    const sectionId: number = +next.paramMap.get('sectionId');
    return this._setSelectedSectionIfExistElseRedirect(topicId, sectionId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _setSelectedSectionIfExistElseRedirect(topicId: number, sectionId: number): Observable<Section> {
    return this._store.select(selectSelectedSection).pipe(
      tap((section: Section) => {
        if (!section || section.id !== sectionId) {
          this._store.dispatch(getSectionById({ 
            topicId: topicId,
            sectionId: sectionId
          }))
        }
      }),
      filter((section: Section) => !!section),
      take(1),
    );
  }  
}
