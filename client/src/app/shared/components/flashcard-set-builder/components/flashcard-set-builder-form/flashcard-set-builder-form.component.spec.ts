import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetBuilderFormComponent } from './flashcard-set-builder-form.component';

describe('FlashcardSetBuilderFormComponent', () => {
  let component: FlashcardSetBuilderFormComponent;
  let fixture: ComponentFixture<FlashcardSetBuilderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetBuilderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetBuilderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
