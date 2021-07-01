import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansUpdateComponent } from './plans-update.component';

describe('PlansUpdateComponent', () => {
  let component: PlansUpdateComponent;
  let fixture: ComponentFixture<PlansUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
