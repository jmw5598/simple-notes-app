import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@sn/user/env/environment';
import { TodoList } from '@sn/user/shared/models';
import { Observable } from 'rxjs';
import { IPageable, Page } from '../models';
import { AbstractCrudService } from './abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListsService extends AbstractCrudService<TodoList, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/todo-lists`);
  }

  public searchTodoLists(searchTerm: string, page?: IPageable): Observable<Page<TodoList>> {
    const params: {[key: string]: any} = !page ? {} : {
      searchTerm: searchTerm,
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction
    };
    return this._http.get<Page<TodoList>>(`${this._base}/search`, { params: params });
  }

  public findBetweenDates(from: Date, to: Date): Observable<TodoList[]> {
    const queryParams: {[key: string]: any} = {
      startDate: from.toISOString(),
      endDate: to.toISOString()
    };
    return this._http.get<TodoList[]>(
      `${this._base}/between`, 
      { params: queryParams }
    );
  }

  public getPastDueTodoLists(pastDueDate: Date): Observable<TodoList[]> {
    const params: {[key: string]: any} = {
      pastDueDate: pastDueDate.toISOString()
    };
    return this._http.get<TodoList[]>(`${this._base}/pastdue`, { params: params });
  }
}
