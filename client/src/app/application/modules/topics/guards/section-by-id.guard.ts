import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Section } from '@sn/shared/models';
import { getSectionById } from '../store/actions';
import { selectSelectedSection } from '../store/selectors';
import { ITopicsState } from '../store/reducers';

@Injectable({
  providedIn: 'root'
})
export class SectionByIdGuard implements CanActivate {
  constructor(private _store: Store<ITopicsState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const topicId: number = +next.paramMap.get('topicId');
    const sectionId: number = +next.paramMap.get('sectionId');
    return this._setSelectedSectionIfExistElseRedirect(topicId, sectionId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _setSelectedSectionIfExistElseRedirect(topicId: number, sectionId: number): Observable<Section> {
    return this._store.select(selectSelectedSection).pipe(
      tap((topic: Section) => {
        if (!topic || topic.id !== topicId) {
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
