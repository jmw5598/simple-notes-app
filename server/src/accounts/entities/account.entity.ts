import { Entity, Column, JoinColumn, OneToOne, OneToMany, ManyToOne, Generated } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Profile } from './profile.entity';
import { Plan } from '../../plans/entities/plan.entity';
import { User } from '../../users/entities/user.entity';
import { StripeCustomer } from './stripe-customers.entity';
import { Topic } from '../../topics/entities/topic.entity';
import { Document } from '../../documents/entities/document.entity';
import { CalendarEvent } from '../../calendar-events/entities/calendar-event.entity';
import { CalendarIntegration } from 'src/calendar-events/entities/calendar-integration.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({ name: 'is_confirmed', default: false })
  public isConfirmed: boolean;

  @Column({ name: 'confirmation_token', nullable: false})
  @Generated('uuid')
  public comfirmationToken: string;

  @ManyToOne(type => Plan, plan => plan.accounts, { nullable: false })
  @JoinColumn({ name: 'plan_id' })
  public plan: Plan;

  @OneToOne(type => User, user => user.account)
  public user: User;

  @OneToOne(type => StripeCustomer, cust => cust.account)
  public stripeCustomer: StripeCustomer;

  @OneToOne(type => Profile, profile => profile.account)
  public profile: Profile;

  @OneToMany(type => Topic, topic => topic.account)
  public topics: Topic[];

  @OneToMany(type => Document, document => document.account)
  public documents: Document[];

  @OneToMany(type => CalendarEvent, event => event.account)
  public calendarEvents: CalendarEvent[];

  @OneToMany(type => CalendarIntegration, integration => integration.account)
  public calendarIntegrations: CalendarIntegration[];
}