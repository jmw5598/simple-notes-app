import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnListItemTitleComponent } from './list-item-title.component';

describe('ListItemTitleComponent', () => {
  let component: SnListItemTitleComponent;
  let fixture: ComponentFixture<SnListItemTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnListItemTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnListItemTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
