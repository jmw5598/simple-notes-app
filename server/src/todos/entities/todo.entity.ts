import { Account } from "src/accounts/entities/account.entity";
import { BaseEntity } from "src/database/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
  @Column({ name: 'started_by', nullable: false, type: 'timestamp with time zone' })
  public startedBy: Date;

  @Column({ name: 'completed_by', nullable: false, type: 'timestamp with time zone' })
  public completedBy: Date;

  @Column({ nullable: false })
  public description: string;

  @Column({ name: 'is_complete', nullable: false })
  public isComplete: boolean = false;

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;
}
