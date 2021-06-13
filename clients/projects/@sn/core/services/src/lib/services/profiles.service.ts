import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractCrudService } from './abstract-crud.service';
import { Profile } from '@sn/shared/models';

import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class ProfilesService extends AbstractCrudService<Profile, number> {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    protected _http: HttpClient
  ) {
    super(_http, `${_configuration.api.baseUrl}/profiles`);
  }
}
