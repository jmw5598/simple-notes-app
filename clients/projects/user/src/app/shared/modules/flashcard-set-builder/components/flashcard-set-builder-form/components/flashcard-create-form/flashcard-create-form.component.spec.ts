import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Store } from '@ngrx/store';
import { SnFlashcardSetBuilderService } from '../../../../services/flashcard-set-builder.service';
import { BehaviorSubject } from 'rxjs';

import { SnFlashcardCreateFormComponent } from './flashcard-create-form.component';

describe('SnFlashcardCreateFormComponent', () => {
  let component: SnFlashcardCreateFormComponent;
  let flashcardSetBuilderService: SnFlashcardSetBuilderService;
  let fixture: ComponentFixture<SnFlashcardCreateFormComponent>;

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
        SnFlashcardCreateFormComponent
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
    fixture = TestBed.createComponent(SnFlashcardCreateFormComponent);
    component = fixture.componentInstance;
    flashcardSetBuilderService = TestBed.inject(SnFlashcardSetBuilderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
