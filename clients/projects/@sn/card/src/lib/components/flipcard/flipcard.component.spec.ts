import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnFlipcardComponent } from './flipcard.component';

describe('SnFlipcardComponent', () => {
  let component: SnFlipcardComponent;
  let fixture: ComponentFixture<SnFlipcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnFlipcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnFlipcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
