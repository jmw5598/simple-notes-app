import { TestBed } from '@angular/core/testing';

import { FlashcardSetBuilderService } from './flashcard-set-builder.service';

describe('FlashcardSetBuilderService', () => {
  let service: FlashcardSetBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardSetBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
