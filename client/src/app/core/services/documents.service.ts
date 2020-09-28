import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AbstractCrudService } from './abstract-crud.service';
import { Document } from '@sn/shared/models';
import { IPageable, Page } from '@sn/core/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService extends AbstractCrudService<Document, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/documents`);
  }

  public searchDocuments(searchTerm: string, page?: IPageable): Observable<Page<Document>> {
    const params: {[key: string]: any} = !page ? {} : {
      searchTerm: searchTerm,
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction
    };
    return this._http.get<Page<Document>>(`${this._base}/search`, { params: params });
  }
}
