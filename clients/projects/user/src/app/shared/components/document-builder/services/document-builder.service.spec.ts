import { TestBed } from '@angular/core/testing';

import { DocumentBuilderService } from './document-builder.service';

describe('DocumentBuilderService', () => {
  let service: DocumentBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
