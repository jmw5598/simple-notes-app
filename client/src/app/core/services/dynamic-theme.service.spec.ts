import { TestBed } from '@angular/core/testing';

import { DynamicThemeService } from './dynamic-theme.service';

describe('DynamicThemeService', () => {
  let service: DynamicThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
