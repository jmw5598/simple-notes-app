import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { SnDropAction } from '../../../../models/drop-action.enum';
import { Section, Topic } from '@sn/shared/models';
import { IAppState } from '@sn/user/store/reducers';
import { Observable } from 'rxjs';
import { SnDocumentBuilderService } from '../../../../services/document-builder.service';

import * as documentSelectors from '@sn/user/application/modules/documents/store/selectors';
import { map } from 'rxjs/operators';
import { DocumentTopic } from '@sn/shared/models';

@Component({
  selector: 'sn-user-document-builder-topic-container',
  templateUrl: './document-builder-topic-container.component.html',
  styleUrls: ['./document-builder-topic-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnDocumentBuilderTopicContainerComponent implements OnInit {
  public readonly TOPIC_DRAGGABLE_ROOT_ELEMENT: string = '.document-builder-topic-container';
  public DropAction = SnDropAction
  public drogDataAction = SnDropAction.CLONE_CONTAINER_ONLY;

  public topicIds$: Observable<string[]>;

  @Input()
  public documentTopic: DocumentTopic;

  constructor(
    private _store: Store<IAppState>,
    private _documentBuilderService: SnDocumentBuilderService
  ) { }

  ngOnInit(): void {
    this.topicIds$ = this._store.select(documentSelectors.selectDocumentBuilderDocument)
      .pipe(map(document => document.documentTopics.map(documentTopic => '' + documentTopic?.topic?.id)));
  }

  public dropSection(event: CdkDragDrop<Section[]>): void {
    console.log("Dropping section inside search form")
  }
}
