import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnListItemSubtitleComponent } from './list-item-subtitle.component';

describe('SnListItemSubtitleComponent', () => {
  let component: SnListItemSubtitleComponent;
  let fixture: ComponentFixture<SnListItemSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnListItemSubtitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnListItemSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
