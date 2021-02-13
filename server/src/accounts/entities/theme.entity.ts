import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public filename: string;

  @OneToMany(type => Account, account => account.theme)
  public accounts: Account[];
}