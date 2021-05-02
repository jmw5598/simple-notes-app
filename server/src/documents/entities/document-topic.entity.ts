import { Topic } from 'src/topics/entities/topic.entity';
import { Document } from './document.entity';
import { JoinColumn, Entity, ManyToOne, OneToMany, Column } from 'typeorm'
import { BaseEntity } from '../../database/entities/base.entity';
import { DocumentTopicSection } from './document-topic-section.entity';

@Entity({ name: 'document_topic' })
export class DocumentTopic extends BaseEntity {
  @ManyToOne(
    type => Document, 
    document => document.documentTopics, 
    { nullable: true, orphanedRowAction: 'delete' }
  )
  @JoinColumn({ name: 'document_id' })
  public document: Document;

  @ManyToOne(type => Topic, { nullable: false })
  @JoinColumn({ name: 'topic_id' })
  public topic: Topic;

  @OneToMany(
    type => DocumentTopicSection, 
    topicSection => topicSection.documentTopic,
    { cascade: true }  
  )
  public documentTopicSections: DocumentTopicSection[];

  @Column({ type: 'int', name: 'order_index', nullable: false })
  public orderIndex: number;
}
