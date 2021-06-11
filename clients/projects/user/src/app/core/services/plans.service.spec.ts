import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@sn/user/env/environment';
import { take } from 'rxjs/operators';

import { Plan } from '../models';
import { PlansService } from './plans.service';

describe('PlansService', () => {
  let service: PlansService;
  let httpMock: HttpTestingController;
  const planMock: Plan = { id: 1, name: 'Free' } as Plan;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PlansService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make POST request to save plan when save is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/plans`;
    service.save(planMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(planMock);
  });

  it('should make PUT request to update plan when update is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/plans/${planMock.id}`;
    service.update(planMock.id, planMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual(planMock);
  });

  it('should make a DELETE request to delete plan when delete is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/plans/${planMock.id}`;
    service.delete(planMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('DELETE');
  });

  it('should make a GET request to find and plan by its id when findOne is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/plans/${planMock.id}`;
    service.findOne(planMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
    expect(httpRequest.request.urlWithParams).toContain(planMock.id.toString());
  });

  it('should make a GET request to find all plan when findAll is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/plans`;
    service.findAll()
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });
});
