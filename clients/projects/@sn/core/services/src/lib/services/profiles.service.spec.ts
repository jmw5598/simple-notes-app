import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@sn/user/env/environment';

import { Profile, Address } from '@sn/shared/models';
import { take } from 'rxjs/operators';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let httpMock: HttpTestingController;

  const profileMock: Profile = {
    id: 1,
    address: { id: 1, street: '1234 Main', city: 'City', state: 'MI' } as Address,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@johndoe.com'
  } as Profile;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProfilesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make POST request to save profile when save is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/profiles`;
    service.save(profileMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(profileMock);
  });

  it('should make PUT request to update profile when update is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/profiles/${profileMock.id}`;
    service.update(profileMock.id, profileMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual(profileMock);
  });

  it('should make a DELETE request to delete profile when delete is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/profiles/${profileMock.id}`;
    service.delete(profileMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('DELETE');
  });

  it('should make a GET request to find and profile by its id when findOne is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/profiles/${profileMock.id}`;
    service.findOne(profileMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
    expect(httpRequest.request.urlWithParams).toContain(profileMock.id.toString());
  });

  it('should make a GET request to find all profile when findAll is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/profiles`;
    service.findAll()
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });
});
