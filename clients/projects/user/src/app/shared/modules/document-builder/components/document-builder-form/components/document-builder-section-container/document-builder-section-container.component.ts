import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Section, Topic } from '@sn/shared/models';
import { DocumentTopicSection } from '@sn/shared/models';

@Component({
  selector: 'sn-user-document-builder-section-container',
  templateUrl: './document-builder-section-container.component.html',
  styleUrls: ['./document-builder-section-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnDocumentBuilderSectionContainerComponent {
  @Input()
  public documentTopicSection: DocumentTopicSection;

  public removeSection(section: Section, topic: Topic): void {
    console.log('removing section');
  }
}
