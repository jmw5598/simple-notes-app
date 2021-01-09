import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@sn/shared/shared.module';
import { SectionUpdateComponent } from './section-update.component';

describe('SectionUpdateComponent', () => {
  let component: SectionUpdateComponent;
  let fixture: ComponentFixture<SectionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        SectionUpdateComponent
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
