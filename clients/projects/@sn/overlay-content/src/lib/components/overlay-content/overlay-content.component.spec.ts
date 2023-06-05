import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnOverlayContentComponent } from './overlay-content.component';
import { SnOverlayContentService } from './overlay-content.service';

describe('SnOverlayContentComponent', () => {
  let component: SnOverlayContentComponent;
  let fixture: ComponentFixture<SnOverlayContentComponent>;
  let overlayContentService: SnOverlayContentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SnOverlayContentComponent
      ],
      providers: [
        SnOverlayContentService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnOverlayContentComponent);
    component = fixture.componentInstance;
    overlayContentService = TestBed.inject(SnOverlayContentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
