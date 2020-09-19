import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMessage } from '@sn/core/models';
import { ExportConfig, ExportFormat, FileResponse, Topic } from '@sn/shared/models';
import { ModalService } from '@sn/shared/components';
import { showHide } from '@sn/shared/animations';

@Component({
  selector: 'sn-topic-export-modal',
  templateUrl: './topic-export-modal.component.html',
  styleUrls: ['./topic-export-modal.component.scss'],
  animations: [showHide]
})
export class TopicExportModalComponent implements OnInit {
  private readonly DEFAULT_FORM_VALUE = {
    format: null,
    includeTopicTitle: true,
    includeTopicSynopsis: true,
    includeSectionTitle: true,
    includeSectionSynopsis: true
  } as ExportConfig;

  @Input()
  public topic: Topic;

  @Input()
  public message: ResponseMessage;

  @Input()
  public file: FileResponse;

  @Output()
  public onExportTopic: EventEmitter<ExportConfig>;

  public form: FormGroup;
  public ExportFormat = ExportFormat;

  constructor(
    private _formBuilder: FormBuilder,
    private _modalService: ModalService
  ) {
    this.onExportTopic = new EventEmitter<ExportConfig>();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      format: ['', [Validators.required]],
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
    this.message = null;
    this._modalService.close();
  }
}
