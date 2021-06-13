import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractCrudService } from './abstract-crud.service';
import { Topic, ExportConfig, FileResponse, TodoList, Page, IPageable } from '@sn/shared/models';

import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class TopicsService extends AbstractCrudService<Topic, number> {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    protected _http: HttpClient
  ) {
    super(_http, `${_configuration.api.baseUrl}/topics`);
  }

  public exportTopic(topicId: number, config: ExportConfig): Observable<FileResponse> {
    return this._http.post(`${this._configuration.api.baseUrl}/topics/${topicId}/download`, config, { observe: 'response', responseType: 'blob', })
      .pipe(map(response => this._extractFile(response)));
  }

  public searchTopics(searchTerm: string, page?: IPageable): Observable<Page<Topic>> {
    const params: {[key: string]: any} = !page ? { searchTerm: searchTerm } : {
      searchTerm: searchTerm,
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction
    };
    return this._http.get<Page<Topic>>(`${this._base}/search`, { params: params });
  }

  public getTodaysTodoLists(): Observable<TodoList[]> {
    return this._http.get<TodoList[]>(`${this._base}/today}`);
  }

  public getPastDueTodoLists(): Observable<TodoList[]> {
    return this._http.get<TodoList[]>(`${this._base}/past-due}`);
  }

  private _extractFile(res: Response | any) {
    const header = res.headers.get('Content-Disposition');
    const filename = header.substring(header.indexOf('filename'), header.length).split("=")[1];
    return new FileResponse(res.body, filename);
  }
}
