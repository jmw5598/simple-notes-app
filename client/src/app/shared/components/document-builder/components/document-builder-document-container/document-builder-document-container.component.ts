import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Document, Topic } from '@sn/shared/models';
import { Observable } from 'rxjs';
import { DropAction } from '../../models/drop-action.enum';
import { DocumentBuilderService } from '../../services/document-builder.service';

@Component({
  selector: 'sn-document-builder-document-container',
  templateUrl: './document-builder-document-container.component.html',
  styleUrls: ['./document-builder-document-container.component.scss']
})
export class DocumentBuilderDocumentContainerComponent implements OnInit {
  public document$: Observable<Document>;
  public documentId$: Observable<string>;

  public readonly TOPIC_DRAGGABLE_ROOT_ELEMENT: string = '.document-builder-topic-container';
  public DropAction = DropAction
  public drogDataAction = DropAction.CLONE_CONTAINER_ONLY;

  constructor(private _documentBuilderService: DocumentBuilderService) { }

  ngOnInit(): void {
    this.document$ = this._documentBuilderService.onDocumnetChanges();
    this.documentId$ = this._documentBuilderService.onDocumentIdChanges();
  }

  public dropTopic(event: CdkDragDrop<Topic[]>): void {
    this._documentBuilderService.dropTopic(event);
  }

  public removeTopic(topic: Topic): void {
    this._documentBuilderService.removeTopic(topic);
  }
}
