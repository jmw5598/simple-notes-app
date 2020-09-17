import { TestBed, inject } from '@angular/core/testing';

import { NavbarSideService } from './navbar-side.service';

describe('NavbarSideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarSideService]
    });
  });

  it('should be created', inject([NavbarSideService], (service: NavbarSideService) => {
    expect(service).toBeTruthy();
  }));
});
