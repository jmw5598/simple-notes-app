import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from '../../accounts/entities/account.entity';
import { DocumentTopic } from './document-topic.entity';

@Entity()
export class Document extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  public name: string;

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @OneToMany(
    type => DocumentTopic, 
    documentTopic => documentTopic.document,
    { cascade: true }
  )
  public documentTopics: DocumentTopic[];
}
