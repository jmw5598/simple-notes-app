import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@sn/user/env/environment';
import { take } from 'rxjs/operators';

import { ThemesService } from './themes.service';

describe('ThemesService', () => {
  let service: ThemesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ThemesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to get all themes when getThemes is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/themes`;
    service.findAll()
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });
});
