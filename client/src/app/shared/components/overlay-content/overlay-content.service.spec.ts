import { TestBed } from '@angular/core/testing';

import { OverlayContentService } from './overlay-content.service';

describe('OverlayContentService', () => {
  let service: OverlayContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
