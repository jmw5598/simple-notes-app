import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FlashcardSet } from '@sn/user/shared/models';
import { AbstractCrudService } from './abstract-crud.service';

import { environment } from '@sn/user/env/environment';
import { IPageable, Page } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService extends AbstractCrudService<FlashcardSet, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/flashcards`);
  }

  public searchFlashcardSets(searchTerm: string, page?: IPageable): Observable<Page<FlashcardSet>> {
    const params: {[key: string]: any} = !page ? {} : {
      searchTerm: searchTerm,
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction
    };
    return this._http.get<Page<FlashcardSet>>(`${this._base}/search`, { params: params });
  }
}
