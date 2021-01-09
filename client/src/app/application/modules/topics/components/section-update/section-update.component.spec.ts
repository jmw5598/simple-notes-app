import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SharedModule } from '@sn/shared/shared.module';
import { of } from 'rxjs';
import { SectionUpdateComponent } from './section-update.component';

describe('SectionUpdateComponent', () => {
  let component: SectionUpdateComponent;
  let fixture: ComponentFixture<SectionUpdateComponent>;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        SectionUpdateComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
