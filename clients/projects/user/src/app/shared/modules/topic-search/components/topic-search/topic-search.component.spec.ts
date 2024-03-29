import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { SnTopicSearchComponent } from '@sn/user/shared/modules/topic-search';
import { SnDrawerService } from '@sn/drawer';
import { PageableSearch } from '@sn/shared/models';
import { DEFAULT_SEARCH_TOPICS_PAGE } from '@sn/user/core/defaults';
import { searchTopicsFromDrawer, searchTopicsFromDrawerResult } from '@sn/user/application/modules/topics/store/actions';
import { Router } from '@angular/router';

describe('TopicSearchComponent', () => {
  let component: SnTopicSearchComponent;
  let fixture: ComponentFixture<SnTopicSearchComponent>;
  let router: Router;
  let drawerService: SnDrawerService;
  const testStore = {
    select: () => of(),
    dispatch: (action?: any) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        SnTopicSearchComponent
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
    fixture = TestBed.createComponent(TopicSearchComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    drawerService = TestBed.inject(SnDrawerService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
    component.ngAfterViewInit();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dispatch with action value when onSearchTopics is called with a value', () => {
    const searchValue: string = 'teting';
    const searchPage: PageableSearch = {
      searchTerm: searchValue,
      pageable: DEFAULT_SEARCH_TOPICS_PAGE
    };
    const actionToDispatch = searchTopicsFromDrawer({ search: searchPage });
    spyOn(testStore,'dispatch');
    component.onSearchTopics(searchValue);
    expect(testStore.dispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('should call dispatch with action with null page when onSearchTopics is called without a value', () => {
    const actionToDispatch = searchTopicsFromDrawerResult({ page: null });
    spyOn(testStore,'dispatch');
    component.onSearchTopics(null);
    expect(testStore.dispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('should calld Router.navigate and DrawerService.close when onGoToTopic is called', () => {
    const topicId: number = 1;
    spyOn(router, 'navigate');
    spyOn(drawerService, 'close');
    component.onGoToTopic(topicId);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(drawerService.close).toHaveBeenCalledTimes(1);
  });

  it('should dispatch searchTopicsFromDrawerResult with null page when ngOnDestroy is called', () => {
    const actionToDispatch = searchTopicsFromDrawerResult({ page: null });
    spyOn(testStore, 'dispatch');
    component.ngOnDestroy();
    expect(testStore.dispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
