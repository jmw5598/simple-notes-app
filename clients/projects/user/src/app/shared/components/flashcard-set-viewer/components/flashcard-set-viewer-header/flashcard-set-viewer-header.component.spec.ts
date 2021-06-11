import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetViewerHeaderComponent } from './flashcard-set-viewer-header.component';

describe('FlashcardSetViewerHeaderComponent', () => {
  let component: FlashcardSetViewerHeaderComponent;
  let fixture: ComponentFixture<FlashcardSetViewerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetViewerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetViewerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
