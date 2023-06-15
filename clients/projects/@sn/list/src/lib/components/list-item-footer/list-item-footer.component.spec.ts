import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnListItemFooterComponent } from './list-item-footer.component';

describe('SnListItemFooterComponent', () => {
  let component: SnListItemFooterComponent;
  let fixture: ComponentFixture<SnListItemFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnListItemFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnListItemFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
