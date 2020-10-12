import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '@sn/core/store/state';
import { ResponseMessage } from '@sn/core/models';
import { ExportConfig, ExportFormat, FileResponse, Topic } from '@sn/shared/models';
import { ModalService } from '@sn/shared/components';
import { showHide } from '@sn/shared/animations';
import { selectExportTopicResponseMessage } from '@sn/core/store/selectors';

@Component({
  selector: 'sn-topic-export',
  templateUrl: './topic-export.component.html',
  styleUrls: ['./topic-export.component.scss'],
  animations: [showHide]
})
export class TopicExportComponent implements OnInit {

  /*
    TODO: This have to be refactored!
    - Get data passed in by DrawerService
    - Remove all these inputs and outputs.
    - Select the file response from state?
  */

  private readonly DEFAULT_FORM_VALUE = {
    format: ExportFormat.PDF,
    includeTopicTitle: true,
    includeTopicSynopsis: true,
    includeSectionTitle: true,
    includeSectionSynopsis: true
  } as ExportConfig;

  @Input()
  public topic: Topic;

  public responseMessage$: Observable<ResponseMessage>;

  @Input()
  public file: FileResponse;

  @Output()
  public onExportTopic: EventEmitter<ExportConfig>;

  public form: FormGroup;
  public ExportFormat = ExportFormat;

  constructor(
    private _store: Store<IAppState>,
    private _formBuilder: FormBuilder,
    private _modalService: ModalService
  ) {
    this.onExportTopic = new EventEmitter<ExportConfig>();
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
  }

  public onSubmit(config: ExportConfig): void {
    this.onExportTopic.emit(config);
  }

  public onClose(): void {
    this.form.patchValue(this.DEFAULT_FORM_VALUE);
    // this.message = null;
    // this._modalService.close();
  }
}
