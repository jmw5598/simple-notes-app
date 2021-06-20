import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsRolesComponent } from './settings-roles.component';

describe('SettingsRolesComponent', () => {
  let component: SettingsRolesComponent;
  let fixture: ComponentFixture<SettingsRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
