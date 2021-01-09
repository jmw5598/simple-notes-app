import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDataComponent } from './empty-data.component';

describe('EmptyDataComponent', () => {
  let component: EmptyDataComponent;
  let fixture: ComponentFixture<EmptyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyDataComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyDataComponent);
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
