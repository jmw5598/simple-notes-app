import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document } from '@sn/shared/models';

@Injectable({
  providedIn: 'root'
})
export class DocumentBuilderService {
  private document: Document;
  private documentSource: BehaviorSubject<Document>;

  constructor() { }

  public onDocumnetChnages(): Observable<Document> {
    return this.documentSource.asObservable();
  }

  public setDocumentContainer(document: Document) { 
    this.document = { ...document };
    this.documentSource.next(this.document);
  }
}
