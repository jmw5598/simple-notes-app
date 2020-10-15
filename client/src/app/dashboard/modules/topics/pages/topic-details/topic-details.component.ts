import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { selectSelectedTopic, selectSearchSectionsResult } from '@sn/core/store/selectors';
import { searchSections, deleteSection, setExportTopicFileResponse, setExportTopicResponseMessage, searchSectionsResult } from '@sn/core/store/actions';
import { FileResponse, Topic, Section } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';
import { PageableSearch, Page, IPageable, ResponseMessage } from '@sn/core/models';
import { DrawerService, DrawerLocation } from '@sn/shared/components';
import { DEFAULT_SEARCH_SECTIONS_PAGE } from '@sn/core/defaults';
import { TopicExportComponent } from '../../components/topic-export/topic-export.component';
import { TopicUpdateComponent } from '../../components/topic-update/topic-update.component';

@Component({
  selector: 'sn-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  providers: [DrawerService],
  animations: [fadeAnimation]
})
export class TopicDetailsComponent implements OnInit, OnDestroy {
  public DrawerLocation = DrawerLocation;
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_SECTIONS_PAGE;

  public topic$: Observable<Topic>;
  public exportTopicResponseMessage$: Observable<ResponseMessage>;
  public exportTopicFile$: Observable<FileResponse>;
  private _topic: Topic;
  public searchSectionsResult$: Observable<Page<Section>>;
  public searchTerm: string = '';

  constructor(
    private _store: Store<IAppState>,
    private _drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    this.searchSectionsResult$ = this._store.select(selectSearchSectionsResult);
    this.topic$ = this._store.select(selectSelectedTopic)
      .pipe(tap((topic: Topic) => {
        this._topic = topic;
      }));
  }

  public onDeleteSection(sectionId: number): void {
    this._store.dispatch(deleteSection({
      sectionId: sectionId,
      topicId: this._topic.id
    }))
  }

  public onOpenExportTopic(): void {
    this._drawerService.show(
      TopicExportComponent, 
      this._topic
    );
  }

  public onUpdateTopic(): void {
    // TODO Implement this component
    this._drawerService.show(
      TopicUpdateComponent,
      this._topic
    );
  }


  public onSearchSections(searchTerm: string): void {
    this.searchTerm = searchTerm;
    const topicSearch: PageableSearch = {
      searchTerm: searchTerm,
      pageable: this.DEFAULT_PAGE
    };
    this._store.dispatch(searchSections({ topicId: this._topic.id, search: topicSearch }));
  }

  public onGoToPage(pageable: IPageable): void {
    const topicSearch: PageableSearch = {
      searchTerm: this.searchTerm,
      pageable: pageable
    };
    this._store.dispatch(searchSections({ topicId: this._topic.id, search: topicSearch }));
  }

  ngOnDestroy(): void {
    this._store.dispatch(searchSectionsResult({ page: null }));
    this._store.dispatch(setExportTopicResponseMessage({ message : null }));
    this._store.dispatch(setExportTopicFileResponse({ file: null }));
  }
}
