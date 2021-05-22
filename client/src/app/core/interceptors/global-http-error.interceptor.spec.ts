import { TestBed } from '@angular/core/testing';

import { GlobalHttpErrorInterceptor } from './global-http-error.interceptor';

describe('GlobalHttpErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalHttpErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GlobalHttpErrorInterceptor = TestBed.inject(GlobalHttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
