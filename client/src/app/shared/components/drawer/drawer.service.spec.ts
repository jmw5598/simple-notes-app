import { TestBed } from '@angular/core/testing';

import { DrawerService } from './drawer.service';

describe('DrawerService', () => {
  let service: DrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DrawerService
      ]
    });
    service = TestBed.inject(DrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
