import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section, IPageable, Page } from '@sn/shared/models';

import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class SectionsService {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    private _http: HttpClient
  ) { }

  public save(topicId: number, section: Section): Observable<Section> {
    return this._http.post<Section>(
      `${this._configuration.api.baseUrl}/topics/${topicId}/sections`,
      section
    );
  }

  public delete(topicId: number, sectionId: number): Observable<Section> {
    return this._http.delete<Section>(
      `${this._configuration.api.baseUrl}/topics/${topicId}/sections/${sectionId}`
    );
  }

  public findOne(topicId: number, sectionId: number): Observable<Section> {
    return this._http.get<Section>(
      `${this._configuration.api.baseUrl}/topics/${topicId}/sections/${sectionId}`
    );
  }

  public update(topicId: number, sectionId: number, section): Observable<Section> {
    return this._http.put<Section>(
      `${this._configuration.api.baseUrl}/topics/${topicId}/sections/${sectionId}`, section
    );
  }

  public updateNotes(topicId: number, sectionId: number, notes: string): Observable<Section> {
    const body = {
      topicId: topicId,
      sectionId: sectionId,
      notes: notes
    }
    return this._http.put<Section>(
      `${this._configuration.api.baseUrl}/topics/${topicId}/sections/${sectionId}/notes`, body
    );
  }

  public searchSections(topicId: number, searchTerm: string, page?: IPageable): Observable<Page<Section>> {
    const params: {[key: string]: any} = !page ? {} : {
      searchTerm: searchTerm,
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction
    };
    return this._http.get<Page<Section>>(
      `${this._configuration.api.baseUrl}/topics/${topicId}/sections/search`, 
      { params: params }
    );
  }

  public findSectionsByTopicId(topicId: number): Observable<Section[]> {
    return this._http.get<Section[]>(
      `${this._configuration.api.baseUrl}/topics/${topicId}/sections`
    );
  }

  // public update(id: ID, t: T): Observable<T>;
  // public findAll(): Observable<T[]>  
}
