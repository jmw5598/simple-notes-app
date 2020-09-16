import { Column, Entity, JoinTable, JoinColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Topic } from './topic.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ unique: true, nullable: false })
  public name: string;

  @ManyToMany(type => Topic, topic => topic.categories)
  @JoinColumn({ name: 'topic_id' })
  public topics: Topic[];
}