import { TestBed } from '@angular/core/testing';

import { SnToasterService } from './toaster.service';

describe('SnToasterService', () => {
  let service: SnToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
