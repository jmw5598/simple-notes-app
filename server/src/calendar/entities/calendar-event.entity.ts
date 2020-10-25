import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class CalendarEvent extends BaseEntity {
  @Column({ nullable: false })
  public title: string;

  @Column({ name: 'start_date_time', nullable: false,  type: 'timestamp with time zone' })
  public startDateTime: Date;

  @Column({ name: 'end_date_time', nullable: false, type: 'timestamp with time zone' })
  public endDateTime: Date;

  @Column({ name: 'is_all_day', default: false })
  public isAllDay: boolean = false;

  @Column({ nullable: false })
  public color: string;

  @Column()
  public location: string;
  
  @Column()
  public description: string;

  @ManyToOne(type => Account, account => account.calendarEvents, { nullable: false })
  @JoinColumn({ name: 'account_id' })
  public account: Account;
}
