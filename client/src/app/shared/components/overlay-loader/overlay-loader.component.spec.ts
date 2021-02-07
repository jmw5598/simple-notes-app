import { NoopAnimationPlayer } from '@angular/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { skip, take } from 'rxjs/operators';

import { OverlayLoaderComponent } from './overlay-loader.component';
import { OverlayLoaderService } from './overlay-loader.service';

describe('OverlayLoaderComponent', () => {
  let component: OverlayLoaderComponent;
  let fixture: ComponentFixture<OverlayLoaderComponent>;
  let overloadLoaderService: OverlayLoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [OverlayLoaderComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayLoaderComponent);
    component = fixture.componentInstance;
    overloadLoaderService = TestBed.inject(OverlayLoaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to true when OverlayLoaderService.setLoadingState is called with true', () => {
    component.isLoading$
      .pipe(
        skip(1),
        take(1)
      ).subscribe(isLoading => expect(isLoading).toBeTrue());
    overloadLoaderService.setLoadingState(true);
  });

  it('should set isLoading to false when OverlayLoaderService.setLoadingState is called with false', () => {
    component.isLoading$
      .pipe(
        skip(1),
        take(1)
      ).subscribe(isLoading => expect(isLoading).toBeFalse());
    overloadLoaderService.setLoadingState(false);
  });
});
