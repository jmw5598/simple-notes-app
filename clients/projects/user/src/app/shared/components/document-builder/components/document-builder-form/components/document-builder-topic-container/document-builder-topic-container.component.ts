import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { DropAction } from '@sn/user/shared/components/document-builder/models/drop-action.enum';
import { Section, Topic } from '@sn/user/shared/models';
import { IAppState } from '@sn/user/store/reducers';
import { Observable } from 'rxjs';
import { DocumentBuilderService } from '../../../../services/document-builder.service';

import * as documentSelectors from '@sn/user/application/modules/documents/store/selectors';
import { map } from 'rxjs/operators';
import { DocumentTopic } from '@sn/user/shared/models/document-topic.model';

@Component({
  selector: 'sn-user-document-builder-topic-container',
  templateUrl: './document-builder-topic-container.component.html',
  styleUrls: ['./document-builder-topic-container.component.scss']
})
export class DocumentBuilderTopicContainerComponent implements OnInit {
  public readonly TOPIC_DRAGGABLE_ROOT_ELEMENT: string = '.document-builder-topic-container';
  public DropAction = DropAction
  public drogDataAction = DropAction.CLONE_CONTAINER_ONLY;

  public topicIds$: Observable<string[]>;

  @Input()
  public documentTopic: DocumentTopic;

  constructor(
    private _store: Store<IAppState>,
    private _documentBuilderService: DocumentBuilderService
  ) { }

  ngOnInit(): void {
    this.topicIds$ = this._store.select(documentSelectors.selectDocumentBuilderDocument)
      .pipe(map(document => document.documentTopics.map(documentTopic => '' + documentTopic?.topic?.id)));
  }

  public dropSection(event: CdkDragDrop<Section[]>): void {
    console.log("Dropping section inside search form")
  }
}
