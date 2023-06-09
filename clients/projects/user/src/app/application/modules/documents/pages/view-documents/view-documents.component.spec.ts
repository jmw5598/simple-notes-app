import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { DocumentListComponent } from '../../components/document-list/document-list.component';
import { DocumentBuilderComponent } from '../../components/document-builder/document-builder.component';
import { ViewDocumentsComponent } from './view-documents.component';

describe('ViewDocumentsComponent', () => {
  let component: ViewDocumentsComponent;
  let fixture: ComponentFixture<ViewDocumentsComponent>;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [
        ViewDocumentsComponent,
        DocumentBuilderComponent,
        DocumentListComponent
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
    fixture = TestBed.createComponent(ViewDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
