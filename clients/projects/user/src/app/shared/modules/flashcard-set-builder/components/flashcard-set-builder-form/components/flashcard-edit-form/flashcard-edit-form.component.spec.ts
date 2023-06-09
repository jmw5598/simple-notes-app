import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnFlashcardEditFormComponent } from './flashcard-edit-form.component';

describe('SnFlashcardEditFormComponent', () => {
  let component: SnFlashcardEditFormComponent;
  let fixture: ComponentFixture<SnFlashcardEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnFlashcardEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnFlashcardEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
