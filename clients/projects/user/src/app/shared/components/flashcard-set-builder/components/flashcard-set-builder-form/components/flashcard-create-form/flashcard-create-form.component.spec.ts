import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Store } from '@ngrx/store';
import { FlashcardSetBuilderService } from '@sn/user/shared/components/flashcard-set-builder/services/flashcard-set-builder.service';
import { BehaviorSubject } from 'rxjs';

import { FlashcardCreateFormComponent } from './flashcard-create-form.component';

describe('FlashcardCreateFormComponent', () => {
  let component: FlashcardCreateFormComponent;
  let flashcardSetBuilderService: FlashcardSetBuilderService;
  let fixture: ComponentFixture<FlashcardCreateFormComponent>;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  }; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        FlashcardCreateFormComponent
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
    fixture = TestBed.createComponent(FlashcardCreateFormComponent);
    component = fixture.componentInstance;
    flashcardSetBuilderService = TestBed.inject(FlashcardSetBuilderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
