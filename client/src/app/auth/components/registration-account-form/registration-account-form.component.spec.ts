import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistrationAccountFormComponent } from './registration-account-form.component';

describe('RegistrationAccountFormComponent', () => {
  let component: RegistrationAccountFormComponent;
  let fixture: ComponentFixture<RegistrationAccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        ReactiveFormsModule
      ],
      declarations: [
        RegistrationAccountFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
