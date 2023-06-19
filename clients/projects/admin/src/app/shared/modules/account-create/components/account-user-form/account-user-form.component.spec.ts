import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUserFormComponent } from './account-user-form.component';

describe('AccountUserFormComponent', () => {
  let component: AccountUserFormComponent;
  let fixture: ComponentFixture<AccountUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
