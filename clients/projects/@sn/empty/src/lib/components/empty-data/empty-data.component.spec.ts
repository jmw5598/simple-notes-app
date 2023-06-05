import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnEmptyDataComponent } from './empty-data.component';

describe('SnEmptyDataComponent', () => {
  let component: SnEmptyDataComponent;
  let fixture: ComponentFixture<SnEmptyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SnEmptyDataComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnEmptyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message in empty-data-message class element', () => {
    const message: string = 'Message...';
    component.message = message;
    fixture.detectChanges();

    const emptyDataElement: HTMLElement = fixture.nativeElement;
    const emptyDataTextElement = emptyDataElement.querySelector('.empty-data-message');

    expect(emptyDataTextElement.textContent).toBe(message);
  });
});
