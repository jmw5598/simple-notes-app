import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SnDropAction } from '../../../../models/drop-action.enum';
import { SnDocumentBuilderService } from '../../../../services/document-builder.service';
import { Observable, of } from 'rxjs';

import { DocumentTopic, DocumentTopicSection } from '@sn/shared/models';

@Component({
  selector: 'sn-user-document-builder-document-topic',
  templateUrl: './document-builder-document-topic.component.html',
  styleUrls: ['./document-builder-document-topic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnDocumentBuilderDocumentTopicComponent implements OnInit {
  public readonly TOPIC_DRAGGABLE_ROOT_ELEMENT: string = '.document-builder-topic-container';
  public DropAction = SnDropAction
  public drogDataAction = SnDropAction.CLONE_CONTAINER_ONLY;

  public topicIds$: Observable<string[]>;

  @Input()
  public documentTopic: DocumentTopic;

  constructor(
    private _documentBuilderService: SnDocumentBuilderService,
  ) { }

  ngOnInit(): void {
    this.topicIds$ = of([]);
  }

  public dropSection(event: CdkDragDrop<DocumentTopicSection[]>): void {
    this._documentBuilderService.dropSection(this.documentTopic, event);
  }

  public removeTopic(documentTopic: DocumentTopic): void {
    this._documentBuilderService.removeTopic(documentTopic);
  }

  public removeSection(documentTopicSection: DocumentTopicSection, documentTopic: DocumentTopic): void {
    console.log("removing section from topic", documentTopic, documentTopicSection);
    this._documentBuilderService.removeSection(documentTopic.topic.id, documentTopicSection);
  }
}
