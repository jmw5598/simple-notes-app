import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IAppState } from '@sn/core/store/state';
import { getTopicById } from '@sn/core/store/actions';
import { selectSelectedTopic } from '@sn/core/store/selectors';
import { Topic } from '@sn/shared/models';

@Injectable({
  providedIn: 'root'
})
export class TopicByIdGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const topicId: number = +next.paramMap.get('topicId');
    return this._setSelectedTopicIfExistElseRedirect(topicId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _setSelectedTopicIfExistElseRedirect(topicId: number): Observable<Topic> {
    return this._store.select(selectSelectedTopic).pipe(
      tap((topic: Topic) => {
        if (!topic || topic.id !== topicId) {
          this._store.dispatch(getTopicById({ id: topicId }))
        }
      }),
      filter((topic: Topic) => !!topic),
      take(1),
    );
  }  
}
