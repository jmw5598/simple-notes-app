import { TestBed } from '@angular/core/testing';

import { SnFlashcardSetViewerControlsService } from './flashcard-set-viewer-controls.service';

describe('SnFlashcardSetViewerControlsService', () => {
  let service: SnFlashcardSetViewerControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnFlashcardSetViewerControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
