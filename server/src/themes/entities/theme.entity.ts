import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class Theme extends BaseEntity {
  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public filename: string;

  @Column({ name: 'css_class_name', nullable: false })
  public cssClassName: string;

  @OneToMany(type => Account, account => account.theme)
  public accounts: Account[];
}
