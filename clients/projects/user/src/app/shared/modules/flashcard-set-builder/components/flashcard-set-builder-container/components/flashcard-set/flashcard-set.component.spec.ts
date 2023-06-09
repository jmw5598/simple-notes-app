import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { SnEmptyDataComponent } from '@sn/empty';
import { SnFlashcardSetBuilderService } from '../../../../services/flashcard-set-builder.service';
import { BehaviorSubject } from 'rxjs';

import { SnFlashcardSetComponent } from './flashcard-set.component';
import { Flashcard } from '@sn/shared/models';

describe('FlashcardSetComponent', () => {
  let component: SnFlashcardSetComponent;
  let flashcardSetBuilderService: SnFlashcardSetBuilderService;
  let fixture: ComponentFixture<SnFlashcardSetComponent>;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  };  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DragDropModule
      ],
      declarations: [
        SnFlashcardSetComponent,
        SnEmptyDataComponent
      ],
      providers: [
        SnFlashcardSetBuilderService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnFlashcardSetComponent);
    component = fixture.componentInstance;
    flashcardSetBuilderService = TestBed.inject(SnFlashcardSetBuilderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call FlashcardSetBuilderService.dropFlaschcard when dropFlashcard is called with event', () => {
    const mockCdkDragDropEvent: CdkDragDrop<Flashcard[]> = {
      container: null,
      previousContainer: null,
      currentIndex: 0,
      previousIndex: 1
    } as CdkDragDrop<Flashcard[]>;
    spyOn(flashcardSetBuilderService, 'dropFlashcard');
    component.dropFlashcard(mockCdkDragDropEvent);
    expect(flashcardSetBuilderService.dropFlashcard).toHaveBeenCalledTimes(1);
    expect(flashcardSetBuilderService.dropFlashcard).toHaveBeenCalledWith(mockCdkDragDropEvent);
  });

  it('should call FlashcardSetBuilderService.removeFlashcard when removeFlashcard is called with a flashcard', () => {
    const mockFlashcard: Flashcard = { 
      id: 1, 
      frontContent: 'Front', 
      backContent: 'Back' 
    } as Flashcard;
    spyOn(flashcardSetBuilderService, 'removeFlashcard');
    component.removeFlashcard(mockFlashcard);
    expect(flashcardSetBuilderService.removeFlashcard).toHaveBeenCalledTimes(1);
    expect(flashcardSetBuilderService.removeFlashcard).toHaveBeenCalledWith(mockFlashcard); 
  });

  it('should call FlashcardSetBuilderService.setFlashcardBeingEdited when editFlashcard is called with a flashcard', () => {
    const mockFlashcard: Flashcard = { 
      id: 1, 
      frontContent: 'Front', 
      backContent: 'Back' 
    } as Flashcard;
    spyOn(flashcardSetBuilderService, 'setFlashcardBeingEdited');
    component.editFlashcard(mockFlashcard);
    expect(flashcardSetBuilderService.setFlashcardBeingEdited).toHaveBeenCalledTimes(1);
    expect(flashcardSetBuilderService.setFlashcardBeingEdited).toHaveBeenCalledWith(mockFlashcard); 
  });
});
