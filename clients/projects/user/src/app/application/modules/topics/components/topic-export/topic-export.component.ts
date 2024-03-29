import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ITopicsState } from '../../store/reducers';
import { ResponseMessage } from '@sn/shared/models';
import { ExportConfig, ExportFormat, FileResponse, Topic } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';
import { selectExportTopicResponseMessage, selectExportTopicFile } from '../../store/selectors';
import { exportTopic } from '../../store/actions';

import { SnDrawerService } from '@sn/drawer';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'sn-user-topic-export',
  templateUrl: './topic-export.component.html',
  styleUrls: ['./topic-export.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class TopicExportComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_FORM_VALUE = {
    format: ExportFormat.PDF,
    includeTopicTitle: true,
    includeTopicSynopsis: true,
    includeSectionTitle: true,
    includeSectionSynopsis: true
  } as ExportConfig;
  
  private _subscriptionSubject: Subject<void>;
  public responseMessage$: Observable<ResponseMessage>;
  public exportTopicFile$: Observable<FileResponse>;
  public topic: Topic;
  public form: UntypedFormGroup;
  public ExportFormat = ExportFormat;

  constructor(
    private _store: Store<ITopicsState>,
    private _formBuilder: UntypedFormBuilder,
    private _drawerService: SnDrawerService,
  ) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this.responseMessage$ = this._store.select(selectExportTopicResponseMessage);
    this.form = this._formBuilder.group({
      format: [ExportFormat.PDF, [Validators.required]],
      includeTopicTitle: [true],
      includeTopicSynopsis: [true],
      includeSectionTitle: [true],
      includeSectionSynopsis: [true]
    });

    this._drawerService.onDataChange()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(data => this.topic = data);

    this.exportTopicFile$ = this._store.select(selectExportTopicFile)
      .pipe(
        tap((file:FileResponse) => {
          console.log("got file? ", file)
          if (file) {
            FileSaver.saveAs(file.blob, file.filename)
          }
        })
      );
  }

  public onSubmit(config: ExportConfig): void {
    this._store.dispatch(exportTopic({ 
      topicId: this.topic.id,
      config: config
    }));
  }

  public onClose(): void {
    this.form.patchValue(this.DEFAULT_FORM_VALUE);
    this._drawerService.close();
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
