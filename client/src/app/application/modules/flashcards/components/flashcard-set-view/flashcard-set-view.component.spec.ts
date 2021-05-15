import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetViewComponent } from './flashcard-set-view.component';

describe('FlashcardSetViewComponent', () => {
  let component: FlashcardSetViewComponent;
  let fixture: ComponentFixture<FlashcardSetViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
