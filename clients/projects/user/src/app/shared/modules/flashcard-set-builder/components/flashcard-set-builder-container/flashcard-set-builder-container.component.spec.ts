import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnFlashcardSetBuilderContainerComponent } from './flashcard-set-builder-container.component';

describe('SnFlashcardSetBuilderContainerComponent', () => {
  let component: SnFlashcardSetBuilderContainerComponent;
  let fixture: ComponentFixture<SnFlashcardSetBuilderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnFlashcardSetBuilderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnFlashcardSetBuilderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
