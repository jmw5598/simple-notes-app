import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@sn/shared/shared.module';
import { DocumentListComponent } from './document-list.component';
import { Document } from '@sn/shared/models';

describe('DocumentListComponent', () => {
  let component: DocumentListComponent;
  let fixture: ComponentFixture<DocumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        DocumentListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event from onCreate when create is called', () => {
    spyOn(component.onCreate, 'emit');
    component.create();
    expect(component.onCreate.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit document from onView when view is called with a Document', () => {
    const documentMock: Document = { id: 1, name: 'Test Doc' } as Document;
    spyOn(component.onView, 'emit');
    component.view(documentMock);
    expect(component.onView.emit).toHaveBeenCalledWith(documentMock);
  });

  it('should emit document id from onDelete when delete is called with a document id', () => {
    const documentIdMock: number = 1;
    spyOn(component.onDelete, 'emit');
    component.delete(documentIdMock);
    expect(component.onDelete.emit).toHaveBeenCalledWith(documentIdMock);
  })
});
