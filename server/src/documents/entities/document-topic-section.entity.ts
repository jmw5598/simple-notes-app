import { Section } from 'src/topics/entities/section.entity';
import { JoinColumn, Entity, ManyToOne, Column } from 'typeorm'
import { BaseEntity } from '../../database/entities/base.entity';
import { DocumentTopic } from './document-topic.entity';

@Entity({ name: 'document_topic_section' })
export class DocumentTopicSection extends BaseEntity {
  @ManyToOne(type => DocumentTopic, { nullable: false, orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'document_topic_id'})
  public documentTopic: DocumentTopic;

  @ManyToOne(type => Section, { nullable: false })
  @JoinColumn({ name: 'section_id' })
  public section: Section;

  @Column({ type: 'int', name: 'order_index', nullable: false })
  public orderIndex: number;
}
