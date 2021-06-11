import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractCrudService } from './abstract-crud.service';
import { Profile } from '../models/profile.model';

import { environment } from '@sn/user/env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService extends AbstractCrudService<Profile, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/profiles`);
  }
}
