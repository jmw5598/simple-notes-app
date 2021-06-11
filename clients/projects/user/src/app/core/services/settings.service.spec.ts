import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@sn/user/env/environment';
import { take } from 'rxjs/operators';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  let httpMock: HttpTestingController;

  const actionIdMock: number = 1;
  const shortcutIdMock: number = 2;
  const shortcutMock: string = 'alt + d'; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SettingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET requeset to get all keyboard shortcuts when getKeyboardShortcuts is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/settings/shortcuts`;
    service.getKeyboardShortcuts()
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET'); 
  });

  it('should make a POST request to create new keyboard shortcut when createKeyboardShortcut is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/settings/shortcuts`;
    service.createKeyboardShortcut(actionIdMock, shortcutMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual({
      actionId: actionIdMock,
      shortcut: shortcutMock
    });
  });

  it('should make PUT request to update a keyboard shortcut when updateKeyboardShortcut is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/settings/shortcuts/${shortcutIdMock}`;
    service.updateKeyboardShortcut(actionIdMock, shortcutIdMock, shortcutMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual({
      actionId: actionIdMock,
      shortcut: shortcutMock
    });
  });

  it('should make a DELETE request to delete a keyboard shortcut by its id when deleteKeyboardShortcut is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/settings/shortcuts/${shortcutIdMock}`;
    service.deleteKeyboardShortcut(shortcutIdMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('DELETE');
  });
});
