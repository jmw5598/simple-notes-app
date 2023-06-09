import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetViewerFlipperComponent } from './flashcard-set-viewer-flipper.component';

describe('FlashcardSetViewerFlipperComponent', () => {
  let component: FlashcardSetViewerFlipperComponent;
  let fixture: ComponentFixture<FlashcardSetViewerFlipperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetViewerFlipperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetViewerFlipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
