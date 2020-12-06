import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '@sn/shared/models';

@Component({
  selector: 'sn-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  @Input()
  public documents: Document[];

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onView: EventEmitter<Document> = new EventEmitter<Document>();

  constructor() { }

  ngOnInit(): void {
  }

  public create(): void {
    console.log("opening drawer to create new document");
  }

  public view(document: Document): void {
    this.onView.emit(document);
  }

  public delete(documentId: number): void {
    this.onDelete.emit(documentId);
  }
}
