import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnFlashcardSetBuilderFormComponent } from './flashcard-set-builder-form.component';

describe('SnFlashcardSetBuilderFormComponent', () => {
  let component: SnFlashcardSetBuilderFormComponent;
  let fixture: ComponentFixture<SnFlashcardSetBuilderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnFlashcardSetBuilderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnFlashcardSetBuilderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
