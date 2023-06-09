import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormControl, UntypedFormGroup, FormGroupDirective, Validators, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnDocumentBuilderFormComponent } from './document-builder-form.component';
import { TopicsService } from '@sn/core/services';

describe('SnDocumentFormComponent', () => {
  let component: SnDocumentBuilderFormComponent;
  let fixture: ComponentFixture<SnDocumentBuilderFormComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
  let testFormGroup: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required])
  });
  testFormGroupDirective.form = testFormGroup;

  const testStore = {
    select(selector: any) { return of(); },
    dispatch(action: any) {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DragDropModule,
        FormsModule,
      ],
      declarations: [
        SnDocumentBuilderFormComponent
      ],
      providers: [
        TopicsService,
        {
          provide: ControlContainer,
          useValue: testFormGroupDirective
        },
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnDocumentBuilderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
