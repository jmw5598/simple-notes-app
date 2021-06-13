import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractCrudService } from './abstract-crud.service';

import { IPageable, Page, FlashcardSet } from '@sn/shared/models';
import { Observable } from 'rxjs';
import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class FlashcardsService extends AbstractCrudService<FlashcardSet, number> {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    protected _http: HttpClient
  ) {
    super(_http, `${_configuration.api.baseUrl}/flashcards`);
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
