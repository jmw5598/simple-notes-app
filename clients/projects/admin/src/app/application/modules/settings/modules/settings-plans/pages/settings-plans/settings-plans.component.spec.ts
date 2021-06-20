import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPlansComponent } from './settings-plans.component';

describe('SettingsPlansComponent', () => {
  let component: SettingsPlansComponent;
  let fixture: ComponentFixture<SettingsPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
