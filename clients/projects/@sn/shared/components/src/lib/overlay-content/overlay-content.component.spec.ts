import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayContentComponent } from './overlay-content.component';
import { OverlayContentService } from './overlay-content.service';

describe('OverlayContentComponent', () => {
  let component: OverlayContentComponent;
  let fixture: ComponentFixture<OverlayContentComponent>;
  let overlayContentService: OverlayContentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OverlayContentComponent
      ],
      providers: [
        OverlayContentService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayContentComponent);
    component = fixture.componentInstance;
    overlayContentService = TestBed.inject(OverlayContentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
