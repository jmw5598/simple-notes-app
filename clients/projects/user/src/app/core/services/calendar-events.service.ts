import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AbstractCrudService } from './abstract-crud.service';
import { CalendarEvent } from '../models/calendar-event.model';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventsService extends AbstractCrudService<CalendarEvent, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/calendar/events`)
  }

  public findBetweenDates(from: Date, to: Date): Observable<CalendarEvent[]> {
    const queryParams: {[key: string]: any} = {
      startDate: from.toISOString(),
      endDate: to.toISOString()
    };
    return this._http.get<CalendarEvent[]>(
      `${environment.api.baseUrl}/calendar/events/between`, 
      { params: queryParams }
    );
  }
}
