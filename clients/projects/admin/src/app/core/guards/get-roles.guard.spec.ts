import { TestBed } from '@angular/core/testing';

import { GetRolesGuard } from './get-roles.guard';

describe('GetRolesGuard', () => {
  let guard: GetRolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GetRolesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
