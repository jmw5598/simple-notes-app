import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ResponseMessage, ResponseStatus } from '@sn/shared/models';
import { Permission } from '@sn/shared/models';
import { BehaviorSubject, of } from 'rxjs';

import { SnTopicFormComponent } from '../topic-form/topic-form.component';
import { SnTopicCreateComponent } from './topic-create.component';
import { SnTagInputComponent } from '@sn/tag-input';

describe('TopicCreateComponent', () => {
  let component: SnTopicCreateComponent;
  let fixture: ComponentFixture<SnTopicCreateComponent>;
  const testStore = {
    payload: new BehaviorSubject<any>(null),
    select: function() { 
      return this.payload.asObservable();
    },
    dispatch: function(action: {[key: string]: any}) {
      this.payload.next({ payload: action.payload });
    }
  };

  const mockTopicFormValue = {
    id: 1,
    title: 'Testing Topic Title',
    synopsis: 'Testing Topic Synopsis',
    permission: Permission.PRIVATE
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        SnTopicCreateComponent,
        SnTopicFormComponent,
        SnTagInputComponent
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
    fixture = TestBed.createComponent(SnTopicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called Store.dispatch when submit is called', () => {
    component.form.patchValue({...mockTopicFormValue});
    spyOn(testStore, 'dispatch');
    component.submit(component.form.value);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should called form.reset() when response message observable receives a value', () => {
    const action: {[key: string]: any} = {
      payload: {
        status: ResponseStatus.SUCCESS,
        message: 'Success!!'
      } as ResponseMessage
    };
    spyOn(component.form, 'reset');
    testStore.dispatch(action);
    expect(component.form.reset).toHaveBeenCalledTimes(1);
  });
});
