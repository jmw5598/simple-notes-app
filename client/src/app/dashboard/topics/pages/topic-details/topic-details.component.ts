import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { selectSelectedTopic, selectExportTopicResponseMessage } from '@sn/core/store/selectors';
import { exportTopic, setSelectedTopic, deleteSection } from '@sn/core/store/actions';
import { ExportConfig, ExportFormat, Topic } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';
import { ResponseMessage } from '@sn/core/models';

@Component({
  selector: 'sn-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  animations: [fadeAnimation]
})
export class TopicDetailsComponent implements OnInit, OnDestroy {
  public topic$: Observable<Topic>;
  public exportTopicResponseMessage$: Observable<ResponseMessage>;
  private _topicId: number;

  constructor(
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.exportTopicResponseMessage$ = this._store.select(selectExportTopicResponseMessage);
    this.topic$ = this._store.select(selectSelectedTopic)
      .pipe(tap((topic: Topic) => {
        this._topicId = topic.id;
      }));
  }

  public delete(sectionId: number): void {
    this._store.dispatch(deleteSection({
      sectionId: sectionId,
      topicId: this._topicId
    }))
  }

  public exportTopic(): void {
    const config: ExportConfig = { format: ExportFormat.PDF } as ExportConfig;
    this._store.dispatch(exportTopic({
      topicId: this._topicId,
      config: config
    }));
  }

  ngOnDestroy(): void {
    this._store.dispatch(setSelectedTopic(null));
  }
}
