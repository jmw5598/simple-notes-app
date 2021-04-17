import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Observer, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, withLatestFrom, takeUntil } from 'rxjs/operators';
import { TopicsService } from '@sn/core/services';
import { IDocumentsState } from '@sn/application/modules/documents/store/reducers';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { getSectionsByTopicId, getSectionsByTopicIdSuccess, setBuilderSearchTopicSelection } from '@sn/application/modules/documents/store/actions';
import { selectSectionsForSelectedTopic } from '@sn/application/modules/documents/store/selectors';
import { Page } from '@sn/core/models';
import { Section, Topic } from '@sn/shared/models';
import { DropAction } from '../../../../components/document-builder/models/drop-action.enum';

import * as fromSelectors from '@sn/application/modules/documents/store/selectors';
import { DocumentTopic } from '@sn/shared/models/document-topic.model';
import { DocumentTopicSection } from '@sn/shared/models/document-topic-section.model';

@Component({
  selector: 'sn-document-builder-form',
  templateUrl: './document-builder-form.component.html',
  styleUrls: ['./document-builder-form.component.scss']
})
export class DocumentBuilderFormComponent implements OnInit {
  public DropAction = DropAction
  public drogDataAction = DropAction.CLONE_CONTAINER_ONLY;

  public form: FormGroup;

  public selected: string;
  public selectedDocumentTopic$: Observable<DocumentTopic>;
  public sectionsForSelectedTopic$: Observable<Section[]>;
  public documentId$: Observable<string[]>;

  public topicsTypeAhead$: Observable<any>;

  private _subscriptionSubject: Subject<any> = new Subject<any>();
  
  constructor(
    private _renderer: Renderer2,
    private _parentControl: ControlContainer,
    private _store: Store<IDocumentsState>,
    private _topicsService: TopicsService,
  ) { }

  ngOnInit(): void {
    this._initilizeForm();
    this._selectState();
    this._initializeTopicTypeAhead();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
    });
  }

  public onSelectTopic(match: TypeaheadMatch): void {
    const topic: Topic = match.item as Topic;
    const documentTopic: DocumentTopic = {
      topic: topic,
      documentTopicSections: []
    } as DocumentTopic;   

    this._store.dispatch(setBuilderSearchTopicSelection({ documentTopic }))
    this._store.dispatch(getSectionsByTopicId({ topicId: topic.id }))
  }

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#search-topics').focus();
  }

  private _initilizeForm(): void {
    this.form = this._parentControl.control as FormGroup;
  }

  private _selectState(): void {
    this.documentId$ = this._store.select(fromSelectors.selectDocumentBuilderDocument)
      .pipe(map(document => [''+document.id]));

    this.selectedDocumentTopic$ = this._store.select(
      fromSelectors.selectDocumentBuilderSearchSelectedTopic
    );
    

    this._store.select(selectSectionsForSelectedTopic)
      .pipe(
        takeUntil(this._subscriptionSubject),
        withLatestFrom(this.selectedDocumentTopic$)
      )
      .subscribe(([sections, documentTopic]) => {
        if (sections?.length && documentTopic) {
          const newDocumentTopic: DocumentTopic = this._mergeDocumentTopicWithSections(documentTopic, sections);
          this._store.dispatch(setBuilderSearchTopicSelection({ documentTopic: newDocumentTopic }));
        }
      });
  }

  private _mergeDocumentTopicWithSections(documentTopic: DocumentTopic, sections: Section[]): DocumentTopic {
    return {
      ...documentTopic,
      documentTopicSections: sections.map(section => ({
        section: section
      } as DocumentTopicSection))
    } as DocumentTopic;
  }

  private _initializeTopicTypeAhead(): void {
    this.topicsTypeAhead$ = new Observable((observer: Observer<string>) => observer.next(this.selected))
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => {
          if (query) {
            return this._topicsService.searchTopics(query)
              .pipe(map((page: Page<Topic>) => page.elements));
          }
          return of([]);
        })
      );
  }

  public ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
    this._store.dispatch(getSectionsByTopicIdSuccess({ sections: null }));
  }
}
