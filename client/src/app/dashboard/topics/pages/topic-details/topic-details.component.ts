import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { selectSelectedTopic } from '@sn/core/store/selectors';
import { Topic } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  animations: [fadeAnimation]
})
export class TopicDetailsComponent implements OnInit {
  public topic$: Observable<Topic>;

  constructor(
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.topic$ = this._store.select(selectSelectedTopic);
  }
}
