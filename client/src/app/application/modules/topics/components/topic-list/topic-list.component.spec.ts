import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '@sn/shared/shared.module';
import { TopicListComponent } from './topic-list.component';

describe('TopicListComponent', () => {
  let component: TopicListComponent;
  let fixture: ComponentFixture<TopicListComponent>;

  const mockTopic = { id: 1 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [TopicListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit topic id from onDelete when delete is called', () => {
    spyOn(component.onDelete, 'emit');
    component.delete(mockTopic.id);
    expect(component.onDelete.emit).toHaveBeenCalledWith(mockTopic.id);
  });
});
