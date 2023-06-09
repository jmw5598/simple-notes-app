import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetViewerComponent } from './flashcard-set-viewer.component';

describe('FlashcardSetViewerComponent', () => {
  let component: FlashcardSetViewerComponent;
  let fixture: ComponentFixture<FlashcardSetViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
