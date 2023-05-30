import { Component, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormGroup, ControlContainer } from '@angular/forms';
import { Store } from '@ngrx/store';
import { concat, Observable, Observer, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, withLatestFrom, takeUntil, tap, catchError, filter } from 'rxjs/operators';
import { TopicsService } from '@sn/core/services';
import { IDocumentsState } from '@sn/user/application/modules/documents/store/reducers';

import { getSectionsByTopicId, getSectionsByTopicIdSuccess, setBuilderSearchTopicSelection } from '@sn/user/application/modules/documents/store/actions';
import { selectSectionsForSelectedTopic } from '@sn/user/application/modules/documents/store/selectors';
import { Page } from '@sn/shared/models';
import { Section, Topic, Document } from '@sn/shared/models';
import { DropAction } from '../../../../components/document-builder/models/drop-action.enum';

import * as fromSelectors from '@sn/user/application/modules/documents/store/selectors';
import * as fromActions from '@sn/user/application/modules/documents/store/actions';
import { DocumentTopic, DocumentTopicSection } from '@sn/shared/models';

@Component({
  selector: 'sn-user-document-builder-form',
  templateUrl: './document-builder-form.component.html',
  styleUrls: ['./document-builder-form.component.scss']
})
export class DocumentBuilderFormComponent implements OnInit {
  public DropAction = DropAction
  public drogDataAction = DropAction.CLONE_CONTAINER_ONLY;

  public form: UntypedFormGroup;

  public selected: string;
  public selectedDocumentTopic$: Observable<DocumentTopic>;
  public sectionsForSelectedTopic$: Observable<Section[]>;
  public documentId$: Observable<string[]>;

  public topicsTypeAhead$: Subject<any> = new Subject<any>();
  public topics$: Observable<any>;
  public topicsLoading: boolean = false;

  private _subscriptionSubject: Subject<any> = new Subject<any>();
  private _documentNameChanges: Subject<string> = new Subject<any>();
  
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
    this._listenForDocumentNameChanges();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
    });
  }

  public onSelectTopic(match: any): void {
    const topic: Topic = match.item as Topic;
    const documentTopic: DocumentTopic = {
      topic: topic,
      documentTopicSections: []
    } as DocumentTopic;   
    this.selected = topic?.title
    this._store.dispatch(setBuilderSearchTopicSelection({ documentTopic }))
    this._store.dispatch(getSectionsByTopicId({ topicId: topic.id }))
  }

  public formatSelection(item: any): string {
    console.log("item is ", item);
    return 'testing';
  }

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#search-topics').focus();
  }

  private _initilizeForm(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
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
    this.topics$ = concat(
        of([]),
        this.topicsTypeAhead$.pipe(
            distinctUntilChanged(),
            debounceTime(500),
            filter(query => !!query),
            tap(() => this.topicsLoading = true),
            switchMap((query: string) =>
              this._topicsService.searchTopics(query)
                .pipe(
                  map(page => page.elements),
                  catchError(() => of([])), // empty list on error
                  tap(() => this.topicsLoading = false)
                ))
        ));
  }

  public documentNameChange($event): void {
    this._documentNameChanges.next($event);
  }

  private _listenForDocumentNameChanges(): void {
    this._documentNameChanges
      .pipe(
        takeUntil(this._subscriptionSubject),
        debounceTime(500),
        distinctUntilChanged(),
        withLatestFrom(this._store.select(fromSelectors.selectDocumentBuilderDocument))
      )
      .subscribe(([name, document]) => {
        this._store.dispatch(fromActions.setBuilderDocument({
          document: { ...document, name: name || '' } as Document
        }));
      });
  }

  public ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
    this._store.dispatch(getSectionsByTopicIdSuccess({ sections: null }));
  }
}
