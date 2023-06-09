import { TestBed } from '@angular/core/testing';

import { SnDocumentBuilderService } from './document-builder.service';

describe('SnDocumentBuilderService', () => {
  let service: SnDocumentBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnDocumentBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
