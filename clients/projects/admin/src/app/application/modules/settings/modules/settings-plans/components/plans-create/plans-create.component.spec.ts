import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansCreateComponent } from './plans-create.component';

describe('PlansCreateComponent', () => {
  let component: PlansCreateComponent;
  let fixture: ComponentFixture<PlansCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
