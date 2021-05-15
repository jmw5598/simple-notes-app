import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardCreateFormComponent } from './flashcard-create-form.component';

describe('FlashcardCreateFormComponent', () => {
  let component: FlashcardCreateFormComponent;
  let fixture: ComponentFixture<FlashcardCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
