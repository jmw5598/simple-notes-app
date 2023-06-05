import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnAlertComponent } from './alert.component';

describe('SnAlertComponent', () => {
  let component: SnAlertComponent;
  let fixture: ComponentFixture<SnAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
