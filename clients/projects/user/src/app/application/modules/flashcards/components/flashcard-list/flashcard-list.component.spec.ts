import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardSet } from '@sn/shared/models';

import { FlashcardListComponent } from './flashcard-list.component';

describe('FlashcardListComponent', () => {
  let component: FlashcardListComponent;
  let fixture: ComponentFixture<FlashcardListComponent>;

  const mockFlashcardSet: FlashcardSet = {
    id: 1,
    flashcards: []
  } as FlashcardSet;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        FlashcardListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when create is called', () => {
    spyOn(component.onCreate, 'emit');
    component.create();
    expect(component.onCreate.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit flashcard set when view is called', () => {
    spyOn(component.onView, 'emit');
    component.view(mockFlashcardSet);
    expect(component.onView.emit).toHaveBeenCalledTimes(1);
    expect(component.onView.emit).toHaveBeenCalledWith(mockFlashcardSet);
  });

  it('should emit flashcard set when edit is called', () => {
    spyOn(component.onEdit, 'emit');
    component.edit(mockFlashcardSet);
    expect(component.onEdit.emit).toHaveBeenCalledTimes(1);
    expect(component.onEdit.emit).toHaveBeenCalledWith(mockFlashcardSet);
  });

  it('should emit flashcard set id when delete is called', () => {
    spyOn(component.onDelete, 'emit');
    component.delete(mockFlashcardSet.id);
    expect(component.onDelete.emit).toHaveBeenCalledTimes(1);
    expect(component.onDelete.emit).toHaveBeenCalledWith(mockFlashcardSet.id);
  });
});
