import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';

import { Topic } from '@sn/shared/models';
import { take } from 'rxjs/operators';
import { DEFAULT_SEARCH_TOPICS_PAGE } from '../defaults';
import { IPageable } from '../models';
import { TopicsService } from './topics.service';

fdescribe('TopicsService', () => {
  let service: TopicsService;
  let httpMock: HttpTestingController;

  const topicMock: Topic = {
    id: 1,
    title: 'Testing',
    synopsis: 'Testing Synopsis'
  } as Topic;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TopicsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make POST request to save topic when save is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics`;
    service.save(topicMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(topicMock);
  });

  it('should make PUT request to update topic when update is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}`;
    service.update(topicMock.id, topicMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual(topicMock);
  });

  it('should make a DELETE request to delete topic when delete is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}`;
    service.delete(topicMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('DELETE');
  });

  it('should make a GET request to find and topic by its id when findOne is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics/${topicMock.id}`;
    service.findOne(topicMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
    expect(httpRequest.request.urlWithParams).toContain(topicMock.id.toString());
  });

  it('should make a GET request to find all topic when findAll is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/topics`;
    service.findAll()
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });

  it('should make a GET request to search topics by searchTerm when searchTopics is called', () => {
    const searchTerm = 'testing';
    const pageable: IPageable = DEFAULT_SEARCH_TOPICS_PAGE;
    const requestUrl: string = `${environment.api.baseUrl}/topics/search?searchTerm=${searchTerm}&page=${pageable.page}&size=${pageable.size}&sortCol=${pageable.sort.column}&sortDir=${pageable.sort.direction}`;
    service.searchTopics(searchTerm, pageable)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });

  // TODO
  it('should export topic', () => {
    fail()
  });
});
