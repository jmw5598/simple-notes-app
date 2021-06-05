import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { EmptyDataComponent } from '@sn/shared/components/empty-data/empty-data.component';
import { FlashcardSetBuilderService } from '@sn/shared/components/flashcard-set-builder/services/flashcard-set-builder.service';
import { BehaviorSubject } from 'rxjs';

import { FlashcardSetComponent } from './flashcard-set.component';
import { Flashcard } from '@sn/shared/models';

describe('FlashcardSetComponent', () => {
  let component: FlashcardSetComponent;
  let flashcardSetBuilderService: FlashcardSetBuilderService;
  let fixture: ComponentFixture<FlashcardSetComponent>;

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
        FlashcardSetComponent,
        EmptyDataComponent
      ],
      providers: [
        FlashcardSetBuilderService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetComponent);
    component = fixture.componentInstance;
    flashcardSetBuilderService = TestBed.inject(FlashcardSetBuilderService);
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
