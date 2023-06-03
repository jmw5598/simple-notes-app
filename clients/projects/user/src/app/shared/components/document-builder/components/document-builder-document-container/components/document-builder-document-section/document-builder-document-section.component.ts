import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DocumentTopicSection } from '@sn/shared/models';

@Component({
  selector: 'sn-user-document-builder-document-section',
  templateUrl: './document-builder-document-section.component.html',
  styleUrls: ['./document-builder-document-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
