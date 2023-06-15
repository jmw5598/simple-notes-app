import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnListItemContentComponent } from './list-item-content.component';

describe('SnListItemContentComponent', () => {
  let component: SnListItemContentComponent;
  let fixture: ComponentFixture<SnListItemContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnListItemContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnListItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
