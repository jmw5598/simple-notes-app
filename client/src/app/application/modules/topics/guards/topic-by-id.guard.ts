import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Topic } from '@sn/shared/models';
import { ITopicsState } from '../store/reducers';
import { getTopicById } from '../store/actions';
import { selectSelectedTopic } from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class TopicByIdGuard implements CanActivate {
  constructor(private _store: Store<ITopicsState>) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
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
