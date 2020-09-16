import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Topic } from './topic.entity';

@Entity()
export class Section extends BaseEntity {
  @Column({ nullable: false })
  public title: string;

  @Column({ nullable: false })
  public synopsis: string;

  @Column({ type: 'text', nullable: false })
  public notes: string;

  @ManyToOne(type => Topic)
  @JoinColumn({ name: 'topic_id' })
  public topic: Topic;
}