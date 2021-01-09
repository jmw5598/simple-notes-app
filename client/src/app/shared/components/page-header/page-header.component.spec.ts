import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageHeaderComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display heading in page-header-text class element', () => {
    const heading: string = 'Heading...';
    component.heading = heading;
    fixture.detectChanges();

    const headerElement: HTMLElement = fixture.nativeElement;
    const headerTextElement = headerElement.querySelector('.page-header-text');
    
    expect(headerTextElement.textContent).toBe(heading);
  });
});
