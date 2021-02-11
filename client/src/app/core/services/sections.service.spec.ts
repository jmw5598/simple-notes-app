import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { take } from 'rxjs/operators';

import { Section, Topic } from '@sn/shared/models';
import { SectionsService } from './sections.service';
import { DEFAULT_SEARCH_TOPICS_PAGE } from '../defaults';
import { IPageable } from '../models';

describe('SectionsService', () => {
  let service: SectionsService;
  let httpMock: HttpTestingController;

  const topicMock: Topic = {
    id: 1,
    title: 'Testing Topic Title',
    synopsis: 'Testing topic synopsis'
  } as Topic;

  const sectionMock: Section = {
    id: 1,
    title: 'Testing Section Title',
    synopsis: 'Testing section synopsis',
    notes: '# Test seciont notes'
  } as Section;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SectionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make POST request to save section when save is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}/sections`;
    service.save(topicMock.id, sectionMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(sectionMock);
  });

  it('should make PUT request to update section when update is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}/sections/${sectionMock.id}`;
    service.update(topicMock.id, sectionMock.id, sectionMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual(sectionMock);
  });

  it('should make a DELETE request to delete section when delete is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}/sections/${sectionMock.id}`;
    service.delete(topicMock.id, sectionMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('DELETE');
  });

  it('should make a GET request to find a section by its id when findOne is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}/sections/${sectionMock.id}`;
    service.findOne(topicMock.id, sectionMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });

  it('should make a PUT request to update the section notes of a section when updateNotes is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}/sections/${sectionMock.id}/notes`;
    const requestBody: object = {
      topicId: topicMock.id,
      sectionId: sectionMock.id,
      notes: sectionMock.notes
    };
    service.updateNotes(topicMock.id, sectionMock.id, sectionMock.notes)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual(requestBody);
  });

  it('should make a GET request to search section by search term when searchSections is called', () => {
    const searchTerm: string = 'testing';
    const pageable: IPageable = DEFAULT_SEARCH_TOPICS_PAGE;
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}/sections/search?searchTerm=${searchTerm}&page=${pageable.page}&size=${pageable.size}&sortCol=${pageable.sort.column}&sortDir=${pageable.sort.direction}`;
    service.searchSections(topicMock.id, searchTerm, pageable)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });

  it('should make a GET request to find sections by topic id when findSeciontsByTopicId is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}/sections`;
    service.findSectionsByTopicId(topicMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });
});
