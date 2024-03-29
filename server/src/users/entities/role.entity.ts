import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ nullable: false, unique: true })
  public name: string

  @Column({ name: 'is_default', nullable: false, default: false })
  public isDefault: boolean;

  @ManyToMany(type => User, user => user.roles)
  public users: User[];
}