import { TestBed } from '@angular/core/testing';

import { FlashcardsSearchResultGuard } from './flashcards-search-result.guard';

describe('FlashcardsSearchResultGuard', () => {
  let guard: FlashcardsSearchResultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FlashcardsSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
