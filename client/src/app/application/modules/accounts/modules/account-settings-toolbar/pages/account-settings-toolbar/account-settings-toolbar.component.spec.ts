import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsToolbarComponent } from './account-settings-toolbar.component';

describe('AccountSettingsToolbarComponent', () => {
  let component: AccountSettingsToolbarComponent;
  let fixture: ComponentFixture<AccountSettingsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
