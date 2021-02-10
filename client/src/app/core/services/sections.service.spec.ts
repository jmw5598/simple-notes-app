import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SectionsService } from './sections.service';

describe('SectionsService', () => {
  let service: SectionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SectionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should make POST request to save document when save is called', () => {
  //   const requestUrl: string = `${environment.api.baseUrl}/documents`;
  //   service.save(documentMock)
  //     .pipe(take(1))
  //     .subscribe();
  //   const httpRequest = httpMock.expectOne(requestUrl);
  //   expect(httpRequest.request.method).toEqual('POST');
  //   expect(httpRequest.request.body).toEqual(documentMock);
  // });

  // it('should make PUT request to update document when update is called', () => {
  //   const requestUrl: string = `${environment.api.baseUrl}/documents/${documentMock.id}`;
  //   service.update(documentMock.id, documentMock)
  //     .pipe(take(1))
  //     .subscribe();
  //   const httpRequest = httpMock.expectOne(requestUrl);
  //   expect(httpRequest.request.method).toEqual('PUT');
  //   expect(httpRequest.request.body).toEqual(documentMock);
  // });

  // it('should make a DELETE request to delete document when delete is called', () => {
  //   const requestUrl: string = `${environment.api.baseUrl}/documents/${documentMock.id}`;
  //   service.delete(documentMock.id)
  //     .pipe(take(1))
  //     .subscribe();
  //   const httpRequest = httpMock.expectOne(requestUrl);
  //   expect(httpRequest.request.method).toEqual('DELETE');
  // });

  // it('should make a GET request to find and document by its id when findOne is called', () => {
  //   const requestUrl: string = `${environment.api.baseUrl}/documents/${documentMock.id}`;
  //   service.findOne(documentMock.id)
  //     .pipe(take(1))
  //     .subscribe();
  //   const httpRequest = httpMock.expectOne(requestUrl);
  //   expect(httpRequest.request.method).toEqual('GET');
  //   expect(httpRequest.request.urlWithParams).toContain(documentMock.id.toString());
  // });

  // it('should make a GET request to find all document when findAll is called', () => {
  //   const requestUrl: string = `${environment.api.baseUrl}/documents`;
  //   service.findAll()
  //     .pipe(take(1))
  //     .subscribe();
  //   const httpRequest = httpMock.expectOne(requestUrl);
  //   expect(httpRequest.request.method).toEqual('GET');
  // });
});
