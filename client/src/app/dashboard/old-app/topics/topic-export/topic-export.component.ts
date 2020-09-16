import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ExportOptions } from './export-options.model';
import { FileType } from '../../shared/model/file-type.enum';
import { ModalOptions } from './modal-options.model';

@Component({
  selector: 'sn-topic-export',
  templateUrl: './topic-export.component.html',
  styleUrls: ['./topic-export.component.css']
})
export class TopicExportComponent implements OnInit {

  @Input()
  options: ModalOptions;

  @Output()
  onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.options = new ModalOptions(false, false);
  }

  ngOnInit() {

  }

  confirm(confirm: boolean) {
    const exportOptions = new ExportOptions(FileType.PDF);
    const event = {
      options: FileType.PDF,
      confirm: confirm
    };
    this.onConfirm.emit(event);
  }

  show() {
    this.options.isShown = true;
  }

}
