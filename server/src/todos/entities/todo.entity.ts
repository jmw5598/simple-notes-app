import { BaseEntity } from "src/database/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TodoList } from "./todo-list.entity";

@Entity()
export class Todo extends BaseEntity {
  @Column({ name: 'completed_at', nullable: true, type: 'timestamp with time zone' })
  public completedAt: Date;

  @Column({ nullable: false })
  public description: string;

  @Column({ name: 'is_complete', nullable: false })
  public isComplete: boolean = false;

  @Column({ type: 'int', name: 'order_index', nullable: false })
  public orderIndex: number;

  @ManyToOne(type => TodoList)
  @JoinColumn({ name: 'todo_list_id' })
  public todoList: TodoList;
}
