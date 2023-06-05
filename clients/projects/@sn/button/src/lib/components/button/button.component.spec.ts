import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnButtonComponent } from './button.component';

describe('SnButtonComponent', () => {
  let component: SnButtonComponent;
  let fixture: ComponentFixture<SnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
