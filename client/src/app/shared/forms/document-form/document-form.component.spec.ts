import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentFormComponent } from './document-form.component';
import { TopicsService } from '@sn/core/services';
import { SharedModule } from '@sn/shared/shared.module';

describe('DocumentFormComponent', () => {
  let component: DocumentFormComponent;
  let fixture: ComponentFixture<DocumentFormComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
  let testFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
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
        SharedModule
      ],
      declarations: [
        DocumentFormComponent
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
    fixture = TestBed.createComponent(DocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
