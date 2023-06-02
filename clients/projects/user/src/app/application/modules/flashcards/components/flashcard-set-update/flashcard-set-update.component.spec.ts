import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DrawerService } from '@sn/user/shared/components';
import { FlashcardSet } from '@sn/shared/models';
import { SharedModule } from '@sn/user/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { BehaviorSubject, of } from 'rxjs';

import { FlashcardSetUpdateComponent } from './flashcard-set-update.component';

describe('FlashcardSetUpdateComponent', () => {
  let component: FlashcardSetUpdateComponent;
  let fixture: ComponentFixture<FlashcardSetUpdateComponent>;

  const mockFlashcardSet: FlashcardSet = {
    id: 1,
    flashcards: []
  } as FlashcardSet;

  const testDrawerService = {
    close: () => {},
    show: (component) => {},
    onDataChange: () => { return of(mockFlashcardSet) }
  }

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SharedModule,
        MarkdownModule.forRoot()
      ],
      declarations: [
        FlashcardSetUpdateComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        {
          provide: DrawerService,
          useValue: testDrawerService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
