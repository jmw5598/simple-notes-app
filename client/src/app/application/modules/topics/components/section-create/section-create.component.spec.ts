import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SharedModule } from '@sn/shared/shared.module';
import { SectionCreateComponent } from './section-create.component';

describe('SectionCreateComponent', () => {
  let component: SectionCreateComponent;
  let fixture: ComponentFixture<SectionCreateComponent>;
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
        SectionCreateComponent
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
    fixture = TestBed.createComponent(SectionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
