import { Account } from 'src/accounts/entities/account.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { CalendarIntegrationType } from './calendar-integration-type.entity';

@Entity()
export class CalendarIntegration extends BaseEntity {
  @Column({ name: 'access_token', nullable: false })
  public accessToken:string;

  @Column({ name: 'refresh_token', nullable: false })
  public refreshToken:string;

  @Column({ name: 'token_type', nullable: false })
  public tokenType:string;

  @Column({ name: 'expires_at', nullable: false, type: 'timestamp with time zone' })
  public expiresAt: Date;

  @ManyToOne(type => CalendarIntegrationType, type => type.calendarIntegrations, { nullable: false })
  @JoinColumn({ name: 'calendar_integration_type_id' })
  public calendarIntegrationType: CalendarIntegrationType;

  @ManyToOne(type => Account, account => account.calendarIntegrations)
  @JoinColumn({ name: 'account_id' })
  public account: Account;
}