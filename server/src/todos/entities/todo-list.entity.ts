import { Account } from "src/accounts/entities/account.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from '../../database/entities/base.entity';
import { Todo } from "./todo.entity";

@Entity({ name: 'todo_list' })
export class TodoList extends BaseEntity {
  @Column({ name: 'started_by', nullable: false, type: 'timestamp with time zone' })
  public startedBy: Date;

  @Column({ name: 'completed_by', nullable: false, type: 'timestamp with time zone' })
  public completedBy: Date;

  @Column({ name: 'title', nullable: false })
  public title: string;

  @OneToMany(
    type => Todo,
    todo => todo.todoList,
    { cascade: true }
  )
  public todos: Todo[];

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;
}
