import { Component, OnInit, Input } from '@angular/core';
import { Document } from '@sn/shared/models';

@Component({
  selector: 'sn-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  @Input()
  public documents: Document[];

  constructor() { }

  ngOnInit(): void {
  }

  public create(): void {
    console.log("opening drawer to create new document");
  }

  public view(document: Document): void {
    console.log('viewing documnet in drawer with id: ', document.id);
  }

  public delete(documentId: number): void {
    console.log('deleting document with id: ', documentId);
  }
}
