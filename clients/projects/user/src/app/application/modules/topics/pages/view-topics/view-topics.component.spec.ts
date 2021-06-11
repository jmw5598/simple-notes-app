import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { DEFAULT_SEARCH_TOPICS_PAGE } from '@sn/core/defaults';
import { IPageable, PageableSearch } from '@sn/core/models';
import { of } from 'rxjs';
import { deleteTopic, searchTopics } from '../../store/actions';

import { SharedModule } from '@sn/shared/shared.module';
import { TopicListComponent } from '../../components/topic-list/topic-list.component';
import { ViewTopicsComponent } from './view-topics.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DrawerService } from '@sn/shared/components';

describe('ViewTopicsComponent', () => {
  let component: ViewTopicsComponent;
  let fixture: ComponentFixture<ViewTopicsComponent>;
  let drawerService: DrawerService;

  const testStore = {
    select: (selector: any) => of(),
    dispatch: (action: any) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        ViewTopicsComponent,
        TopicListComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTopicsComponent);
    component = fixture.componentInstance;
    drawerService = fixture.debugElement.injector.get(DrawerService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch searchTopics action when onSearchTopics is called', () => {
    spyOn(testStore, 'dispatch');
    const searchTerm: string = 'testing';
    const defaultPage: IPageable = DEFAULT_SEARCH_TOPICS_PAGE;
    const expectedSearch: PageableSearch = {
      searchTerm: searchTerm,
      pageable: defaultPage
    }
    component.onSearchTopics(searchTerm);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      searchTopics({ search : expectedSearch })
    );
  });

  it('should dispatch deleteTopic action when onDelete is called with topic id', () => {
    spyOn(testStore, 'dispatch');
    const topicId: number = 1;
    component.onDelete(topicId);
    expect(testStore.dispatch).toHaveBeenCalledWith(deleteTopic({ id: topicId })); 
  });

  it('should dispatch searchTopics action when onGoToPage is called', () => {
    spyOn(testStore, 'dispatch');
    const defaultPage: IPageable = DEFAULT_SEARCH_TOPICS_PAGE;
    const expectedPageSearch: PageableSearch = {
      searchTerm: '',
      pageable: defaultPage
    };
    component.onGoToPage(defaultPage);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      searchTopics({ search: expectedPageSearch })
    );
  });

  it('should show drawer when onDeleteSection is called with sectionId', () => {
    spyOn(drawerService, 'show');
    component.onCreate();
    expect(drawerService.show).toHaveBeenCalled();
  });
});
