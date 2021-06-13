import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';

import { DrawerService } from './drawer.service';

describe('DrawerService', () => {
  let service: DrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DrawerService
      ]
    });
    service = TestBed.inject(DrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit false for drawer visibilty when close is called', (done) => {
    service.onDrawerVibilityChange()
      .pipe(
        skip(2),
        take(1)
      ).subscribe(isDrawerShown => {
        expect(isDrawerShown).toBeFalse();
        done();
      });
    service.show(null);
    service.close();
  });

  it('should emit true fro drawer visibilty when show is called', (done) => {
    service.onDrawerVibilityChange()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(isDrawerShown => {
        expect(isDrawerShown).toBeTrue();
        done();
      });
    service.show(null);
  });

  it('should emit data when setData is called', (done) => {
    const expectedData: any = { title: 'Testing Data Change' };
    service.onDataChange()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(data => {
        expect(data).toEqual(expectedData);
        done();
      });
    service.setData(expectedData);
  });

  it('should emit data when show is called', (done) => {
    const expectedData: any = { title: 'Testing Data Change' };
    service.onDataChange()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(data => {
        expect(data).toEqual(expectedData);
        done();
      });
    service.show(null, { data: expectedData });
  });

  it('should emit content when show is called', (done) => {
    const expectedContent: any = { content: 'Testing Content Change' };
    service.onContentChange()
      .pipe(take(1))
      .subscribe(content => {
        expect(content).toEqual(expectedContent);
        done();
      });
    service.show(expectedContent);
  });
});
