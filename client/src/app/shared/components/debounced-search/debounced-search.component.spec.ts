import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebouncedSearchComponent } from './debounced-search.component';

describe('DebouncedSearchComponent', () => {
  let component: DebouncedSearchComponent;
  let fixture: ComponentFixture<DebouncedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebouncedSearchComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebouncedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search text when onSearchInputKeyUp is called', (done) => {
    const keyupEvent = {
      target: { value: 'testing' }
    };
    component.debounceTime = 0;
    component.onSearch.subscribe(value => {
      expect(value).toBe(keyupEvent.target.value);
      done();
    });
    component.onSearchInputKeyUp(keyupEvent);
  });

  it('should emit search text when search method is called', () => {
    const searchText: string = 'testing';
    spyOn(component.onSearch, 'emit');
    component.search(searchText);
    expect(component.onSearch.emit).toHaveBeenCalledWith(searchText);
  });

  it('should toggle isInputShown when onToggleSearchInput is called', () => {
    const isInputShown: boolean = false;
    component.isInputShown = isInputShown;
    component.onToggleSearchInput();
    expect(component.isInputShown).toBe(!isInputShown);
  });
});
