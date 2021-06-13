import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@sn/user/env/environment';
import { take } from 'rxjs/operators';
import { CalendarEventsService } from './calendar-events.service';
import { CalendarEvent } from '@sn/shared/models';

describe('CalendarEventsService', () => {
  let service: CalendarEventsService;
  let httpMock: HttpTestingController;

  const calendarEventMock: CalendarEvent = {
    id: 1,
    title: 'Event',
    description: 'Description',
    color: 'red',
    startDateTime: new Date(),
    endDateTime: new Date(),
    isAllDay: false,
    location: 'Location'
  } as CalendarEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CalendarEventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make POST request to save account when save is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/calendar/events`;
    service.save(calendarEventMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(calendarEventMock);
  });

  it('should make PUT request to update account when update is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/calendar/events/${calendarEventMock.id}`;
    service.update(calendarEventMock.id, calendarEventMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual(calendarEventMock);
  });

  it('should make a DELETE request to delete account when delete is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/calendar/events/${calendarEventMock.id}`;
    service.delete(calendarEventMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('DELETE');
  });

  it('should make a GET request to find and account by its id when findOne is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/calendar/events/${calendarEventMock.id}`;
    service.findOne(calendarEventMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
    expect(httpRequest.request.urlWithParams).toContain(calendarEventMock.id.toString());
  });

  it('should make a GET request to find all accounts when findAll is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/calendar/events`;
    service.findAll()
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });

  it('should make GET request to get calendar events between two date when findBetweenDates is called', () => {
    const startDate = new Date();
    const endDate = new Date();
    const requestUrl: string = `${environment.api.baseUrl}/calendar/events/between?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    service.findBetweenDates(startDate, endDate)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });
});
