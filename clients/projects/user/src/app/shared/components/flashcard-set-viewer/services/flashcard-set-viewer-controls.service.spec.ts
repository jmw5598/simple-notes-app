import { TestBed } from '@angular/core/testing';

import { FlashcardSetViewerControlsService } from './flashcard-set-viewer-controls.service';

describe('FlashcardSetViewerControlsService', () => {
  let service: FlashcardSetViewerControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardSetViewerControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
