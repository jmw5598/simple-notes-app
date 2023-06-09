import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Section } from '@sn/shared/models';
import { RouterTestingModule } from '@angular/router/testing';

import { SectionListComponent } from './section-list.component';

describe('SectionListComponent', () => {
  let component: SectionListComponent;
  let fixture: ComponentFixture<SectionListComponent>;

  const mockSection = {
    id: 1,
    title: 'Mock Section',
    synopsis: 'Mock Synopsis'
  } as Section;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [SectionListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit section id from onDelete when delete is called', () => {
    spyOn(component.onDelete, 'emit');
    component.delete(mockSection.id);
    expect(component.onDelete.emit).toHaveBeenCalledWith(mockSection.id);
  });

  it('should emit section from onEdit when edit is called', () => {
    spyOn(component.onEdit, 'emit');
    component.edit(mockSection);
    expect(component.onEdit.emit).toHaveBeenCalledWith(mockSection);
  });

  it('should emit event from onCreate when create is called', () => {
    spyOn(component.onCreate, 'emit');
    component.create();
    expect(component.onCreate.emit).toHaveBeenCalledTimes(1);
  });
});
