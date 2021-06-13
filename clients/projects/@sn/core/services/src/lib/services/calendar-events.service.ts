import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AbstractCrudService } from './abstract-crud.service';
import { CalendarEvent } from '@sn/shared/models';

import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class CalendarEventsService extends AbstractCrudService<CalendarEvent, number> {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    protected _http: HttpClient
  ) {
    super(_http, `${_configuration.api.baseUrl}/calendar/events`)
  }

  public findBetweenDates(from: Date, to: Date): Observable<CalendarEvent[]> {
    const queryParams: {[key: string]: any} = {
      startDate: from.toISOString(),
      endDate: to.toISOString()
    };
    return this._http.get<CalendarEvent[]>(
      `${this._configuration.api.baseUrl}/calendar/events/between`, 
      { params: queryParams }
    );
  }
}
