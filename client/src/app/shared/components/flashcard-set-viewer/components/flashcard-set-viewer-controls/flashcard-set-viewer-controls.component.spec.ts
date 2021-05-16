import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetViewerControlsComponent } from './flashcard-set-viewer-controls.component';

describe('FlashcardSetViewerControlsComponent', () => {
  let component: FlashcardSetViewerControlsComponent;
  let fixture: ComponentFixture<FlashcardSetViewerControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetViewerControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetViewerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
