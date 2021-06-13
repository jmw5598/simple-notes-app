import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { DrawerService, OverlayLoaderService } from '@sn/user/shared/components';
import { TodoList } from '@sn/shared/models';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ViewTodosComponent } from './view-todos.component';
import * as todoActions from '../../store/actions';
import { SharedModule } from '@sn/user/shared/shared.module';
import { IPageable, PageableSearch } from '@sn/shared/models';
import { DEFAULT_SEARCH_TODOS_PAGE } from '@sn/user/core/defaults';

describe('ViewTodosComponent', () => {
  let component: ViewTodosComponent;
  let fixture: ComponentFixture<ViewTodosComponent>;
  let drawerService: DrawerService

  const mockTodoList: TodoList = {
    id: 123,
    title: 'Testing Todo List',
    todos: []
  } as TodoList

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) {  }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule
      ],
      declarations: [
        ViewTodosComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        DrawerService,
        OverlayLoaderService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodosComponent);
    component = fixture.componentInstance;
    drawerService = TestBed.inject(DrawerService);
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

  it('should dispatch deleteTodoList action when onDelete is called with a todo list id', () => {
    spyOn(testStore, 'dispatch');
    component.onDelete(mockTodoList.id);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      todoActions.deleteTodoList({
        todoListId: mockTodoList.id
      })
    );
  });

  it('should call DrawerService.show when onView is called with todo list', () => {
    spyOn(drawerService, 'show');
    component.onView(mockTodoList);
    expect(drawerService.show).toHaveBeenCalledTimes(1);
  });

  it('should call DrawerService.show when onEdit is called with todo list', () => {
    spyOn(drawerService, 'show');
    component.onEdit(mockTodoList);
    expect(drawerService.show).toHaveBeenCalledTimes(1);
  });

  it('should dispatch searchTodoLists action when onGoToPage is called with an IPageable', () => {
    const pageable: IPageable = DEFAULT_SEARCH_TODOS_PAGE;
    const expectedSearch: PageableSearch = { searchTerm: '', pageable: pageable };
    spyOn(testStore, 'dispatch');
    component.onGoToPage(pageable);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1)
    expect(testStore.dispatch).toHaveBeenCalledWith(
      todoActions.searchTodoLists({ search: expectedSearch })
    );
  });

  it('should dispatch searchTodoLists action when onSearchTodoLists is called with a search term', () => {
    const searchTerm: string = 'Testing Search Term';
    const pageable: IPageable = DEFAULT_SEARCH_TODOS_PAGE;
    const expectedSearch: PageableSearch = { searchTerm: searchTerm, pageable: pageable };
    spyOn(testStore, 'dispatch');
    component.onSearchTodoLists(searchTerm);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1)
    expect(testStore.dispatch).toHaveBeenCalledWith(
      todoActions.searchTodoLists({ search: expectedSearch })
    );
  })
});
