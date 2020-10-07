import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsDisplayComponent } from './account-details-display.component';

describe('AccountDetailsDisplayComponent', () => {
  let component: AccountDetailsDisplayComponent;
  let fixture: ComponentFixture<AccountDetailsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
