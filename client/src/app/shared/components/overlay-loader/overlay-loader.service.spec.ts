import { TestBed } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';

import { OverlayLoaderService } from './overlay-loader.service';

describe('OverlayLoaderService', () => {
  let service: OverlayLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit value as loading when setLoadingState is called with true', () => {
    service.onLoadingStateChanges()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(isLoading => expect(isLoading).toBeTrue());
    service.setLoadingState(true);
  });

  it('should emit value as not loading when setLoadingState is called with false', () => {
    service.onLoadingStateChanges()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(isLoading => expect(isLoading).toBeFalse());
    service.setLoadingState(false);
  });
});
