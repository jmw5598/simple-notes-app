import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { SnDrawerService } from '@sn/drawer';

import { SnFlashcardSetCreateComponent } from './flashcard-set-create.component';

fdescribe('FlashcardSetCreateComponent', () => {
  let component: SnFlashcardSetCreateComponent;
  let fixture: ComponentFixture<SnFlashcardSetCreateComponent>;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  }; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        SnFlashcardSetCreateComponent
      ],
      providers: [
        SnDrawerService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnFlashcardSetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
