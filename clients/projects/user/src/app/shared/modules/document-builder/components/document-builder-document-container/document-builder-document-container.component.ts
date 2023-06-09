import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Document, DocumentTopic } from '@sn/shared/models';
import { IAppState } from '@sn/user/store/reducers';
import { Observable } from 'rxjs';
import { SnDropAction } from '../../models/drop-action.enum';
import * as fromSelectors from '@sn/user/application/modules/documents/store/selectors';
import { map } from 'rxjs/operators';
import { SnDocumentBuilderService } from '../../services/document-builder.service';

@Component({
  selector: 'sn-user-document-builder-document-container',
  templateUrl: './document-builder-document-container.component.html',
  styleUrls: ['./document-builder-document-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnDocumentBuilderDocumentContainerComponent implements OnInit {
  public document$: Observable<Document>;
  public documentId$: Observable<string[]>;

  public readonly TOPIC_DRAGGABLE_ROOT_ELEMENT: string = '.document-builder-topic-container';
  public DropAction = SnDropAction
  public drogDataAction = SnDropAction.CLONE_CONTAINER_ONLY;

  constructor(
    private _store: Store<IAppState>,
    private _documentBuilderService: SnDocumentBuilderService
  ) { }

  ngOnInit(): void {
    this.document$ = this._store.select(fromSelectors.selectDocumentBuilderDocument);
    this.documentId$ = this._store.select(
      fromSelectors.selectDocumentBuilderDocument
    ).pipe(map(document => [''+document.id]));
  }

  public dropTopic(event: CdkDragDrop<DocumentTopic[]>): void {
    this._documentBuilderService.dropTopic(event);
  }

  public removeTopic(documentTopic: DocumentTopic): void {
    this._documentBuilderService.removeTopic(documentTopic);
  }
}
