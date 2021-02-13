import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from './account.entity';

import { BaseEntity } from '../../database/entities/base.entity';

@Entity()
export class Theme extends BaseEntity {
  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public filename: string;

  @OneToMany(type => Account, account => account.theme)
  public accounts: Account[];
}