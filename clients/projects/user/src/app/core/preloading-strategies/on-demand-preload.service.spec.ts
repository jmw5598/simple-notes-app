import { TestBed } from '@angular/core/testing';

import { OnDemandPreloadService } from './on-demand-preload.service';

describe('OnDemandPreloadService', () => {
  let service: OnDemandPreloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnDemandPreloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
