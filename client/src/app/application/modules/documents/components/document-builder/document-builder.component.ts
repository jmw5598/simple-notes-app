import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Observer, Observable, of, noop } from 'rxjs';
import { tap, map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Topic } from '@sn/shared/models';
import { mockTopics } from './topics-data.mock';
import { Page } from '@sn/core/models';
import { TopicsService } from '@sn/core/services';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'sn-document-builder',
  templateUrl: './document-builder.component.html',
  styleUrls: ['./document-builder.component.scss']
})
export class DocumentBuilderComponent implements OnInit {
  
  public completed = [
    {
      name: 'Android',
      category: 'Mobile Development'
    },
    {
      name: 'MongoDB',
      category: 'Databases'
    },
    {
      name: 'ARKit',
      category: 'Augmented Reality'
    },
    {
      name: 'React',
      category: 'Web Development'
    }
  ];

  public selected: string;
  public selectedTopic: Topic;
  topics: Topic[] = mockTopics;

  topics$: Observable<any>;

  constructor(
    private _http: HttpClient,
    private _topicsService: TopicsService
  ) { }

  ngOnInit(): void {
    this.topics$ = new Observable((observer: Observer<string>) => {
      observer.next(this.selected);
    }).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // tap((search: string ) => console.log(search))
      switchMap((query: string) => {
        if (query) {
          // TODO CREATE DEFAULT PAGE
          return this._topicsService.searchTopics(query)
            .pipe(map((page: Page<Topic>) => page.elements));
        }
 
        return of([]);
      })
    );
  }

  public onSelectTopic(match: TypeaheadMatch): void {
    console.log("selected topic", match.item);
    // dispatch action to get sections by topics id
    // TODO create this state on documents state.
    // Need to create actions, state, reducer, effects, and selectors
    // need to sub to selected topic sections and use that to display the list of sections???
    this.selectedTopic = match.item;
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
}
