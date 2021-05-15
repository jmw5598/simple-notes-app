import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetCreateComponent } from './flashcard-set-create.component';

describe('FlashcardSetCreateComponent', () => {
  let component: FlashcardSetCreateComponent;
  let fixture: ComponentFixture<FlashcardSetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
