import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';

import { OverlayContentService } from './overlay-content.service';

class MockContentComponent {}

describe('OverlayContentService', () => {
  let service: OverlayContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OverlayContentService
      ]
    });
    service = TestBed.inject(OverlayContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit onVisibilityChange value when show is called', (done) => {
    service.onVibilityChange()
      .pipe(skip(1), take(1))
      .subscribe((isContentVisible) => {
        expect(isContentVisible).toBeTrue();
        done();
      });
    service.show(null);
  });

  it('should emit onVisibilityChange value when close is called', (done) => {
    service.onVibilityChange()
      .pipe(skip(2), take(1))
      .subscribe((isContentVisible) => {
        expect(isContentVisible).toBeFalse();
        done();
      });
    service.show(null);
    service.close();
  });

  it('should emit onContentChange value when show is called', (done) => {
    service.onContentChange()
      .pipe(take(1))
      .subscribe(content => {
        expect(content).toBeInstanceOf(Type);
        done();
      });
    service.show(MockContentComponent);
  });

  it('should emite onDataChange value when setData is called', (done) => {
    const mockData = { title: 'Mock Data' };
    service.onDataChange()
      .pipe(skip(1), take(1))
      .subscribe(data => {
        expect(data).toBe(mockData);
        done();
      });
    service.setData(mockData);
  });
});
