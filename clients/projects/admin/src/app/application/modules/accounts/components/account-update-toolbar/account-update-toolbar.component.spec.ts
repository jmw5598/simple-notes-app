import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUpdateToolbarComponent } from './account-update-toolbar.component';

describe('AccountUpdateToolbarComponent', () => {
  let component: AccountUpdateToolbarComponent;
  let fixture: ComponentFixture<AccountUpdateToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountUpdateToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUpdateToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
