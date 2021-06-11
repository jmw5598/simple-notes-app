import { Component, Input } from '@angular/core';
import { Section, Topic } from '@sn/user/shared/models';
import { DocumentTopicSection } from '@sn/user/shared/models/document-topic-section.model';

@Component({
  selector: 'sn-document-builder-section-container',
  templateUrl: './document-builder-section-container.component.html',
  styleUrls: ['./document-builder-section-container.component.scss']
})
export class DocumentBuilderSectionContainerComponent {
  @Input()
  public documentTopicSection: DocumentTopicSection;

  public removeSection(section: Section, topic: Topic): void {
    console.log('removing section');
  }
}
