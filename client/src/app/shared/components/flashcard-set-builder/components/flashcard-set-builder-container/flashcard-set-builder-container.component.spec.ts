import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetBuilderContainerComponent } from './flashcard-set-builder-container.component';

describe('FlashcardSetBuilderContainerComponent', () => {
  let component: FlashcardSetBuilderContainerComponent;
  let fixture: ComponentFixture<FlashcardSetBuilderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSetBuilderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetBuilderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
