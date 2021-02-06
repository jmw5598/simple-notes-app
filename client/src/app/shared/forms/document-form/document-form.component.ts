import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Observable, Observer, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { TopicsService } from '@sn/core/services';
import { IDocumentsState } from '@sn/application/modules/documents/store/reducers';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { getSectionsByTopicId, getSectionsByTopicIdSuccess } from '@sn/application/modules/documents/store/actions';
import { selectSectionsForSelectedTopic, selectSelectedTopic } from '@sn/application/modules/documents/store/selectors';
import { Page } from '@sn/core/models';
import { Section, Topic } from '@sn/shared/models';


@Component({
  selector: 'sn-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {
  public form: FormGroup;

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
    private _parentControl: ControlContainer,
    private _store: Store<IDocumentsState>,
    private _topicsService: TopicsService
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;

    this.selectedTopic$ = this._store.select(selectSelectedTopic);
    this._store.select(selectSectionsForSelectedTopic)
      .subscribe(sections => this.selectedSections = sections ? sections.map(s => s) : []);
    
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
    // console.log(event.previousContainer.data[event.previousIndex]); // Gets the item dropped
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
