import { TestBed } from '@angular/core/testing';

import { DocumentsSearchResultGuard } from './documents-search-result.guard';

describe('DocumentsSearchResultGuard', () => {
  let guard: DocumentsSearchResultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DocumentsSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
