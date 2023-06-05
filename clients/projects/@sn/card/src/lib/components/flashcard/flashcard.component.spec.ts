import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnFlashcardComponent } from './flashcard.component';

describe('SnFlashcardComponent', () => {
  let component: SnFlashcardComponent;
  let fixture: ComponentFixture<SnFlashcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnFlashcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
