import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SharedModule } from '@sn/shared/shared.module';
import { BehaviorSubject } from 'rxjs';
import { DrawerService } from '../drawer/drawer.service';

import { FlashcardSetCreateComponent } from './flashcard-set-create.component';

fdescribe('FlashcardSetCreateComponent', () => {
  let component: FlashcardSetCreateComponent;
  let fixture: ComponentFixture<FlashcardSetCreateComponent>;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  }; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        FlashcardSetCreateComponent
      ],
      providers: [
        DrawerService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
