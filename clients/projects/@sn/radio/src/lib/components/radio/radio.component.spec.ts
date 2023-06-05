import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnRadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: SnRadioComponent;
  let fixture: ComponentFixture<SnRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
