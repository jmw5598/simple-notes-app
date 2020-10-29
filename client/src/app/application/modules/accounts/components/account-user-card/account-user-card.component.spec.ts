import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUserCardComponent } from './account-user-card.component';

describe('AccountUserCardComponent', () => {
  let component: AccountUserCardComponent;
  let fixture: ComponentFixture<AccountUserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
