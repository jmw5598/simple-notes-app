import { Injectable } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { DropAction } from '../models/drop-action.enum';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/user/store/reducers';

import * as documentActions from '@sn/user/application/modules/documents/store/actions';
import { DocumentTopic, DocumentTopicSection } from '@sn/shared/models';

@Injectable({
  providedIn: 'root'
})
export class DocumentBuilderService {
  constructor(
    private _store: Store<IAppState>
  ) {}

  public removeTopic(documentTopic: DocumentTopic): void {
    this._store.dispatch(documentActions.removeBuilderTopic({
      topicId: documentTopic?.topic?.id
    }));
  }

  public removeSection(topicId: number, documentTopicSection: DocumentTopicSection): void {
    this._store.dispatch(documentActions.removeBuilderSection({
      topicId: topicId,
      sectionId: documentTopicSection?.section?.id
    }));
  }

  public dropTopic(event: CdkDragDrop<DocumentTopic[]>): void {
    if (event.previousContainer === event.container) {
      this.moveTopic(event);
      return;
    }

    const existingTopic: DocumentTopic = event.container.data
      .find(e => e?.topic?.id === event.previousContainer.data[event.previousIndex]?.topic?.id);

    if (existingTopic) return;

    if (event.item.data === DropAction.CLONE_CONTAINER_ONLY) {
      this.copyTopicOnly(event);
      return;
    }

    if(event.item.data === DropAction.CLONE_WHOLE) {
      this.copyTopicWithSections(event);
      return;
    }
  }

  public dropSection(documentTopic: DocumentTopic, event: CdkDragDrop<DocumentTopicSection[]>): void {
    if (event.container === event.previousContainer) {
      this.moveSection(documentTopic, event);
      return;
    }
    this.copySection(documentTopic, event);
  }

  private copySection(documentTopic: DocumentTopic, event: CdkDragDrop<DocumentTopicSection[]>): void {
    const previousContainerSections = event.previousContainer.data.map(s => ({ ...s }));
    const containerSections = event.container.data.map(s => ({ ...s }));
    
    const existingSection: DocumentTopicSection = event.container.data.find(documentTopicSection => {
      return documentTopicSection?.section?.id === event.previousContainer.data[event.previousIndex]?.section?.id; 
    });

    if (existingSection) return;

    copyArrayItem(
      previousContainerSections,
      containerSections,
      event.previousIndex, 
      event.currentIndex
    );
    this.updateDocumentTopicSections(documentTopic, containerSections);
  }

  private moveSection(documentTopic: DocumentTopic, event: CdkDragDrop<DocumentTopicSection[]>): void {
    const containerSections = event.container.data.map(s => ({ ...s }));
    moveItemInArray(
      containerSections,
      event.previousIndex,
      event.currentIndex
    );
    this.updateDocumentTopicSections(documentTopic, containerSections);
  }

  private moveTopic(event: CdkDragDrop<DocumentTopic[]>): void {
    const containerTopics = event.container.data.map(t => ({ ...t }));
    moveItemInArray(
      containerTopics,
      event.previousIndex,
      event.currentIndex
    );
    this.updateDocumentTopics(containerTopics);
  }

  private copyTopicOnly(event: CdkDragDrop<DocumentTopic[]>): void {
    const previousContainerTopics = event.previousContainer.data.map(t => ({ ...t }));
    const containerTopics = event.container.data.map(t => ({ ...t }));
    previousContainerTopics.forEach(e => e.documentTopicSections = []);
    copyArrayItem(
      previousContainerTopics,
      containerTopics,
      event.previousIndex, 
      event.currentIndex
    );
    this.updateDocumentTopics(containerTopics);
  }

  private copyTopicWithSections(event: CdkDragDrop<DocumentTopic[]>): void {
    const previousContainerTopics = event.previousContainer.data.map(t => ({ ...t }));
    const containerTopics = event.container.data.map(t => ({ ...t }));
    copyArrayItem(
      previousContainerTopics,
      containerTopics,
      event.previousIndex, 
      event.currentIndex
    );
    this.updateDocumentTopics(containerTopics);
  }

  private updateDocumentTopics(documentTopics: DocumentTopic[]): void {
    this._store.dispatch(documentActions.setBuilderTopics({
      documentTopics: documentTopics
    }));
  }

  private updateDocumentTopicSections(documentTopic: DocumentTopic, documentTopicSections: DocumentTopicSection[]): void {
    this._store.dispatch(documentActions.setBuilderTopicSections({
      topicId: documentTopic?.topic?.id || -1,
      documentTopicSections: documentTopicSections 
    }));
  }
}
