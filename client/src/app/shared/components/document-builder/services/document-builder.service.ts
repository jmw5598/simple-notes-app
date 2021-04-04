import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document, Topic } from '@sn/shared/models';
import { map } from 'rxjs/operators';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { DropAction } from '../models/drop-action.enum';

@Injectable({
  providedIn: 'root'
})
export class DocumentBuilderService {
  private document: Document = { id: -1, topics: [] } as Document;
  private documentSource: BehaviorSubject<Document>;

  constructor() {
    this.documentSource = new BehaviorSubject<Document>(this.document)
  }

  public onDocumnetChanges(): Observable<Document> {
    return this.documentSource.asObservable();
  }

  public onDocumentIdChanges(): Observable<string> {
    return this.documentSource.asObservable()
      .pipe(map(document => ''+document?.id))
  }

  public setDocumentContainer(document: Document) { 
    this.document = { ...document };
    this.documentSource.next(this.document);
  }

  public removeTopic(topic: Topic): void {
    this.document = {
      ...this.document,
      topics: this.document.topics.filter(e => e.id !== topic.id)
    } as Document
    this.documentSource.next(this.document);
  }

  public dropTopic(event: CdkDragDrop<Topic[]>): void {
    if (event.previousContainer === event.container) {
      this.move(event);
      return;
    }

    if (event.item.data === DropAction.CLONE_CONTAINER_ONLY) {
      this.copyTopicOnly(event);
      return;
    }

    if(event.item.data === DropAction.CLONE_WHOLE) {
      this.copyTopicWithSections(event);
      return;
    }
  }

  private copyTopicWithSections(event: CdkDragDrop<Topic[]>): void {
    const topics: Topic[] = JSON.parse(JSON.stringify(event.previousContainer.data));
    copyArrayItem(
      topics,
      event.container.data,
      event.previousIndex, event.currentIndex
    );
  }
  
  private copyTopicOnly(event: CdkDragDrop<Topic[]>): void {
    const topics: Topic[] = JSON.parse(JSON.stringify(event.previousContainer.data));
    topics.forEach(e => e.sections = []);
    copyArrayItem(
      topics,
      event.container.data,
      event.previousIndex, event.currentIndex
    );
  }

  private move(event: CdkDragDrop<Topic[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  private copy(event: CdkDragDrop<Topic[]>): void {
    copyArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex, event.currentIndex
    );
  }
}
