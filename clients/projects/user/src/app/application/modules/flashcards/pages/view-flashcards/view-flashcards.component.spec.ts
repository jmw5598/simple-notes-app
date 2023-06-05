import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SnDrawerService } from '@sn/drawer';
import { FlashcardSet } from '@sn/shared/models';
import { SharedModule } from '@sn/user/shared/shared.module';
import { BehaviorSubject, of } from 'rxjs';

import { ViewFlashcardsComponent } from './view-flashcards.component';
import * as flashcardActions from '../../store/actions';
import { SnOverlayContentService } from '@sn/overlay-content';
import { PageableSearch } from '@sn/shared/models';
import { DEFAULT_SEARCH_FLASHCARDS_PAGE } from '@sn/user/core/defaults';

describe('ViewFlashcardsComponent', () => {
  let component: ViewFlashcardsComponent;
  let fixture: ComponentFixture<ViewFlashcardsComponent>;
  let drawerService: SnDrawerService
  let overlayConentService: SnOverlayContentService;

  const mockFlashcardSet: FlashcardSet = {
    id: 123,
    title: 'Testing Flashcard Set',
    flashcards: []
  } as FlashcardSet

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) {  }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        ViewFlashcardsComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        SnDrawerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFlashcardsComponent);
    component = fixture.componentInstance;
    drawerService = TestBed.inject(SnDrawerService);
    overlayConentService = fixture.debugElement.injector.get(SnOverlayContentService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DrawerService.show when onCreate is called', () => {
    spyOn(drawerService, 'show');
    component.onCreate();
    expect(drawerService.show).toHaveBeenCalledTimes(1);
  });

  it('should dispatch deleteFlashcardSet action when onDelete is called with a flashcard set id', () => {
    spyOn(testStore, 'dispatch');
    component.onDelete(mockFlashcardSet.id);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      flashcardActions.deleteFlashcardSet({
        flashcardSetId: mockFlashcardSet.id
      })
    );
  });

  it('should dispatch getFlashcardSetById action and call OverlayContentService.show when onView is called with a flashcard set', () => {
    spyOn(overlayConentService, 'show');
    spyOn(testStore, 'dispatch');
    component.onView(mockFlashcardSet);
    expect(overlayConentService.show).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      flashcardActions.getFlashcardSetById({
        flashcardSetId: mockFlashcardSet.id
      })
    );
  });

  it('should dispatch getFlashcardSetById action and open drawer when onEdit is called with a flaschard set', () => {
    spyOn(testStore, 'dispatch');
    spyOn(drawerService, 'show');
    component.onEdit(mockFlashcardSet);
    expect(drawerService.show).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      flashcardActions.getFlashcardSetById({
        flashcardSetId: mockFlashcardSet.id
      })
    )
  });

  it('should dispatch searchFlashcardSet action when onGoToPage is called with an IPageable', () => {
    spyOn(testStore, 'dispatch');
    const expectedActionPayload: PageableSearch = {
      searchTerm: '',
      pageable: DEFAULT_SEARCH_FLASHCARDS_PAGE
    } as PageableSearch;
    component.onGoToPage(DEFAULT_SEARCH_FLASHCARDS_PAGE);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      flashcardActions.searchFlashcardSets({
        search: expectedActionPayload
      })
    );
  });

  it('should dispatch searchFlashcardSet action when onSearchFlashcards is caledd with a search term', () => {
    spyOn(testStore, 'dispatch');
    const searchTerm: string = 'Testing Search';
    const pageableSearch: PageableSearch = {
      searchTerm: searchTerm,
      pageable: DEFAULT_SEARCH_FLASHCARDS_PAGE
    } as PageableSearch;
    component.onSearchFlashcards(searchTerm);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      flashcardActions.searchFlashcardSets({
        search: pageableSearch
      })
    );
  });
});
