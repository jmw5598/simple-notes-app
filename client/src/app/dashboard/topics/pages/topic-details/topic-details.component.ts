import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { selectSelectedTopic, selectExportTopicResponseMessage, selectExportTopicFile } from '@sn/core/store/selectors';
import { exportTopic, setSelectedTopic, deleteSection, setExportTopicFileResponse, setExportTopicResponseMessage } from '@sn/core/store/actions';
import { ExportConfig, ExportFormat, FileResponse, Topic } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';
import { ResponseMessage } from '@sn/core/models';
import * as FileSaver from 'file-saver';
import { ModalService } from '@sn/shared/components';

@Component({
  selector: 'sn-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  animations: [fadeAnimation]
})
export class TopicDetailsComponent implements OnInit, OnDestroy {
  public topic$: Observable<Topic>;
  public exportTopicResponseMessage$: Observable<ResponseMessage>;
  public exportTopicFile$: Observable<FileResponse>;
  private _topicId: number;

  constructor(
    private _store: Store<IAppState>,
    private _modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.exportTopicResponseMessage$ = this._store.select(selectExportTopicResponseMessage);
    this.exportTopicFile$ = this._store.select(selectExportTopicFile)
      .pipe(
        tap((file:FileResponse) => {
          if (file) {
            FileSaver.saveAs(file.blob, file.filename)
          }
        })
      );

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

  public onExportTopic(config: ExportConfig): void {
    this._store.dispatch(exportTopic({
      topicId: this._topicId,
      config: config
    }));
  }

  public onOpenExportModal(): void {
    this._modalService.show();
  }

  public onCloseExportModal(): void {
    this._modalService.close();
  }

  ngOnDestroy(): void {
    this._store.dispatch(setSelectedTopic(null));
    this._store.dispatch(setExportTopicResponseMessage(null));
    this._store.dispatch(setExportTopicFileResponse(null));
  }
}
