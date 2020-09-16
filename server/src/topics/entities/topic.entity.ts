import { Column, Entity, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { BaseEntity } from '../../database/entities/base.entity';
import { Category } from './category.entity';
import { Permission } from '../enums/permission.enum';
import { Section } from './section.entity';

@Entity()
export class Topic extends BaseEntity {
  @Column({ nullable: false })
  public title: string;

  @Column({ nullable: false })
  public synopsis: string;

  @Column({ nullable: false })
  public permission: Permission = Permission.PRIVATE;

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;
  
  @OneToMany(type => Section, section => section.topic)
  public sections: Section[];

  @ManyToMany(type => Category, category => category.topics)
  @JoinTable({ name: 'topic_category' })
  @JoinColumn({ name: 'category_id' })
  public categories: Category[];
}