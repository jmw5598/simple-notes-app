import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { CalendarIntegration } from './calendar-integration.entity';

@Entity()
export class CalendarIntegrationType extends BaseEntity {
  @Column({ nullable: false })
  public name: string;

  @OneToMany(type => CalendarIntegration, integration => integration.calendarIntegrationType)
  public calendarIntegrations: CalendarIntegration[];
}
