import { Component, OnInit, OnDestroy, AfterViewInit, Renderer2 } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observer, Observable, of, noop } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Section, Topic } from '@sn/shared/models';
import { mockTopics } from './topics-data.mock';
import { Page } from '@sn/core/models';
import { TopicsService } from '@sn/core/services';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Store } from '@ngrx/store';
import { IDocumentsState } from '../../store/reducers';
import { getSectionsByTopicId, getSectionsByTopicIdSuccess } from '../../store/actions';
import { selectSectionsForSelectedTopic, selectSelectedTopic } from '../../store/selectors';

@Component({
  selector: 'sn-document-builder',
  templateUrl: './document-builder.component.html',
  styleUrls: ['./document-builder.component.scss']
})
export class DocumentBuilderComponent implements OnInit, OnDestroy, AfterViewInit {
  
  public document = [
    
  ];

  public selectedSections: Section[] = []

  public selected: string;
  public selectedTopic: Topic;
  public selectedTopic$: Observable<Topic>;
  public sectionsForSelectedTopic$: Observable<Section[]>;

  // topics: Topic[] = mockTopics;
  topics$: Observable<any>;

  constructor(
    private _renderer: Renderer2,
    private _store: Store<IDocumentsState>,
    private _topicsService: TopicsService
  ) { }

  ngOnInit(): void {
    this.selectedTopic$ = this._store.select(selectSelectedTopic);
    this._store.select(selectSectionsForSelectedTopic)
      .subscribe(sections => sections ? this.selectedSections = sections?.map(s => s) : []);
    
    this.topics$ = new Observable((observer: Observer<string>) => {
      observer.next(this.selected);
    }).pipe(
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
    });
  }

  public onSelectTopic(match: TypeaheadMatch): void {
    this.selectedTopic = match.item as Topic;
    this._store.dispatch(getSectionsByTopicId({ topicId: this.selectedTopic.id }))
  }

  public onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#search-topics').focus();
  }

  public ngOnDestroy(): void {
    this._store.dispatch(getSectionsByTopicIdSuccess({ sections: null }));
  }
}
