import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

import { CalendarIntegrationsService } from './calendar-integrations.service';

describe('CalendarIntegrationsService', () => {
  let service: CalendarIntegrationsService;

  const mockCoreServicesConfiguration: CoreServicesConfiguration = {
    auth: { baseUrl: 'http://host:4200/auth' },
    api: { baseUrl: 'http://host:4200' }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CalendarIntegrationsService,
        {
          provide: CORE_SERVICES_CONFIGURATION,
          useValue: mockCoreServicesConfiguration
        }
      ]
    });
    service = TestBed.inject(CalendarIntegrationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
