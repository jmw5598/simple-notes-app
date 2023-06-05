import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IPageable, Page, PageRequest, SortDirection } from '@sn/user/core/models';

import { SnPaginatorComponent } from './paginator.component';

describe('SnPaginatorComponent', () => {
  let component: SnPaginatorComponent;
  let fixture: ComponentFixture<SnPaginatorComponent>;
  const mockPage: Page<any> = {
    current: { page: 2, size: 10, sort: { column: 'id', direction: SortDirection.ASCENDING } } as IPageable,
    next: { page: 1, size: 10, sort: { column: 'id', direction: SortDirection.ASCENDING } } as IPageable,
    previous: { page: 3, size: 10, sort: { column: 'id', direction: SortDirection.ASCENDING } } as IPageable
  } as Page<any>; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SnPaginatorComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit next page when nextPage is called', () => {
    component.page = mockPage;
    spyOn(component.onNextPage, 'emit');
    component.nextPage();
    expect(component.onNextPage.emit).toHaveBeenCalledWith(mockPage.next);
  });

  it('should emit previous page when previousPage is called', () => {
    component.page = mockPage;
    spyOn(component.onPreviousPage, 'emit');
    component.previousPage();
    expect(component.onPreviousPage.emit).toHaveBeenCalledWith(mockPage.previous);
  });

  it('should emit page when goToPage is called with page number', () => {
    const pageToGoTo: number = 2;
    const expectedPageToGoTo: IPageable = PageRequest.from(
      pageToGoTo, 
      mockPage.current.size,
      mockPage.current.sort.column,
      mockPage.current.sort.direction
    );
    component.page = mockPage;
    spyOn(component.onGoToPage, 'emit');
    component.goToPage(pageToGoTo);
    expect(component.onGoToPage.emit).toHaveBeenCalledWith(expectedPageToGoTo);
  });
});
