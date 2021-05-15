import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetComponent } from './flashcard-set.component';

describe('FlashcardSetComponent', () => {
  let component: FlashcardSetComponent;
  let fixture: ComponentFixture<FlashcardSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
