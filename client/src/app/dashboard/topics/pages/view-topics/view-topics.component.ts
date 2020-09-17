import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from '@sn/core/store/state';
import { Topic } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';
import { selectTopics } from '@sn/core/store/selectors';
import { deleteTopic } from '@sn/core/store/actions';

@Component({
  selector: 'sn-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.scss'],
  animations: [fadeAnimation]
})
export class ViewTopicsComponent implements OnInit {
  public topics$: Observable<Topic[]>;

  constructor(
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.topics$ = this._store.select(selectTopics);
  }

  public onDelete(id: number): void {
    this._store.dispatch(deleteTopic({ id: id }));
  }
}
