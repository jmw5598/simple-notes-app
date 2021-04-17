import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DocumentTopicSection } from '@sn/shared/models/document-topic-section.model';

@Component({
  selector: 'sn-document-builder-document-section',
  templateUrl: './document-builder-document-section.component.html',
  styleUrls: ['./document-builder-document-section.component.scss']
})
export class DocumentBuilderDocumentSectionComponent {
  @Input()
  public documentTopicSection: DocumentTopicSection;

  @Output()
  public onRemoveSection: EventEmitter<DocumentTopicSection> = new EventEmitter<DocumentTopicSection>();

  public removeSection(documentTopicSection: DocumentTopicSection): void {
    this.onRemoveSection.emit(documentTopicSection);
  }
}
