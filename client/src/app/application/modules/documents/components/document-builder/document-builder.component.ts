import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Observer, Observable, of, noop } from 'rxjs';
import { tap, map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Topic } from '@sn/shared/models';
import { mockTopics } from './topics-data.mock';

@Component({
  selector: 'sn-document-builder',
  templateUrl: './document-builder.component.html',
  styleUrls: ['./document-builder.component.scss']
})
export class DocumentBuilderComponent implements OnInit {
  public todos = [
    {
      name: 'Angular',
      category: 'Web Development'
    },
    {
      name: 'Flexbox',
      category: 'Web Development'
    },
    {
      name: 'iOS',
      category: 'App Development'
    },
    {
      name: 'Java',
      category: 'Software development'
    }
  ];

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

  selected: string;
  topics: Topic[] = mockTopics;

  topics$: Observable<any>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.topics$ = new Observable((observer: Observer<string>) => {
      observer.next(this.selected);
    }).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query) {
          // using github public api to get users by name
          return this.http.get<any>(
            'https://api.github.com/search/users', {
            params: { q: query }
          }).pipe(
            map((data: any) => data && data.items || []),
            tap(() => noop, err => {
              // in case of http error
              console.log('error');
            })
          );
        }
 
        return of([]);
      })
    );
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
