import { TestBed } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';

import { OverlayLoaderService } from './overlay-loader.service';

fdescribe('OverlayLoaderService', () => {
  let service: OverlayLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit value as loading when setLoadingState is called with true', (done) => {
    service.onLoadingStateChanges()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(isLoading => {
        expect(isLoading).toBeTrue();
        done();
      });
    service.setLoadingState(true);
  });

  it('should emit value as not loading when setLoadingState is called with false', (done) => {
    service.onLoadingStateChanges()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(isLoading => {
        expect(isLoading).toBeFalse()
        done();
      });
    service.setLoadingState(false);
  });
});
