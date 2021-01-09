import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { JwtTokenInterceptor } from './jwt-token.interceptor';

describe('JwtTokenInterceptor', () => {
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtTokenInterceptor,
      {
        provide: Store,
        useValue: testStore
      }
    ]
  }));

  it('should be created', () => {
    const interceptor: JwtTokenInterceptor = TestBed.inject(JwtTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
