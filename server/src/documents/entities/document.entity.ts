import { Column, Entity, ManyToMany, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Section } from '../../topics/entities/section.entity';

@Entity()
export class Document extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  public name: string;

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @ManyToMany(type => Section, section => section.documents)
  @JoinTable({ name: 'document_section' })
  public sections: Section[];
}
