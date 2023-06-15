import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnListItemComponent } from './list-item.component';

describe('SnListItemComponent', () => {
  let component: SnListItemComponent;
  let fixture: ComponentFixture<SnListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
