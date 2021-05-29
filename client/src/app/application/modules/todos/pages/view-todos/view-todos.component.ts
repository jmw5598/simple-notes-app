import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DEFAULT_SEARCH_TODOS_PAGE } from '@sn/core/defaults';
import { IPageable, Page, PageableSearch } from '@sn/core/models';
import { AbstractPageOverlayLoader, DrawerLocation, DrawerService, OverlayLoaderService } from '@sn/shared/components';
import { TodoList } from '@sn/shared/models';
import { Observable, Subject } from 'rxjs';
import { ITodosState } from '../../store/reducers';

import * as todosSelectors from '../../store/selectors';
import * as todosActions from '../../store/actions';
import { takeUntil, tap } from 'rxjs/operators';
import { fadeAnimation } from '@sn/shared/animations';
import { TodoListCreateComponent } from '@sn/shared/components/todo-list-create/todo-list-create.component';
import { TodoListViewComponent } from '../../components/todo-list-view/todo-list-view.component';
import { TodoListEditComponent } from '../../components/todo-list-edit/todo-list-edit.component';

@Component({
  selector: 'sn-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrls: ['./view-todos.component.scss'],
  animations: [fadeAnimation]
})
export class ViewTodosComponent extends AbstractPageOverlayLoader implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_TODOS_PAGE;
  public DrawerLocation = DrawerLocation;
  public isSearching: boolean = false;

  public searchTodoListsResult$: Observable<Page<TodoList>>;
  public searchTerm: string = '';

  constructor(
    private _store: Store<ITodosState>,
    private _drawerService: DrawerService,
    protected _overlayLoaderService: OverlayLoaderService,
  ) {
    super(_overlayLoaderService);
  }

  ngOnInit(): void {
    this.searchTodoListsResult$ = this._store.select(todosSelectors.selectSearchTodoListsResult)
      .pipe(tap(() => this.isSearching = false));
    this.listenForDeleteTodoListResponseMessage();
    this.listenForSelectedTodoListChanges();
  }

  public onCreate(): void {
    this._drawerService.show(TodoListCreateComponent);
  }

  public onDelete(todoListId: number): void {
    this._store.dispatch(todosActions.deleteTodoList({ todoListId: todoListId }));
  }

  public onView(todoList: TodoList): void {
    this._store.dispatch(todosActions.getTodoListById({ todoListId: todoList.id }));
    this._drawerService.show(TodoListViewComponent)
  }

  public onEdit(todoList: TodoList): void {
    this._store.dispatch(todosActions.getTodoListById({ todoListId: todoList.id }));
    this._drawerService.show(TodoListEditComponent);
  }

  public onGoToPage(pageable: IPageable): void {
    const documentSearch: PageableSearch = {
      searchTerm: '', //this.searchTerm || '',
      pageable: pageable
    };
    this._store.dispatch(todosActions.searchTodoLists({ search: documentSearch }));
  }

  public onSearchTodoLists(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.isSearching = true;
    const search: PageableSearch = {
      searchTerm: searchTerm,
      pageable: this.DEFAULT_PAGE
    };
    this._store.dispatch(todosActions.searchTodoLists({ search: search }));
  }

  public listenForSelectedTodoListChanges(): void {
    this._store.select(todosSelectors.selectSelectedTodoList)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((todoList: TodoList) => this._drawerService.setData(todoList))
  }

  public listenForDeleteTodoListResponseMessage(): void {
    this._store.select(todosSelectors.selectDeleteTodoListResponseMessage)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(message => {
        this.onSearchTodoLists(this.searchTerm);
      })
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
