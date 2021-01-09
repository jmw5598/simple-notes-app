import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { SharedModule } from '@sn/shared/shared.module';
import { TopicExportComponent } from './topic-export.component';

describe('TopicExportComponent', () => {
  let component: TopicExportComponent;
  let fixture: ComponentFixture<TopicExportComponent>;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        TopicExportComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
