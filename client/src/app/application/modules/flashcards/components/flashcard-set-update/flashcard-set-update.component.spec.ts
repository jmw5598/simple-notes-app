import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetUpdateComponent } from './flashcard-set-update.component';

describe('FlashcardSetUpdateComponent', () => {
  let component: FlashcardSetUpdateComponent;
  let fixture: ComponentFixture<FlashcardSetUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
