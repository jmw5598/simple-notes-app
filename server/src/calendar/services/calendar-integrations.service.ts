import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarIntegrationTypeDto } from '../dtos/calendar-integration-type.dto';
import { CalendarIntegrationDto } from '../dtos/calendar-integration.dto';
import { CalendarIntegrationType } from '../entities/calendar-integration-type.entity';
import { CalendarIntegration } from '../entities/calendar-integration.entity';
import { CalendarIntegrationNotFoundException } from '../exceptions/calendar-integration-not-found.exception';
import { CalendarIntegrationTypeNotFoundException } from '../exceptions/calendar-integration-type-not-found.exception';
import { CalendarIntegrationTypeMapper } from '../mappers/calendar-integration-type.mapper';
import { CalendarIntegrationMapper } from '../mappers/calendar-integration.mapper';

@Injectable()
export class CalendarIntegrationsService {
  constructor(
    @InjectRepository(CalendarIntegration)
    private readonly _calendarIntegrationsRepository: Repository<CalendarIntegration>,
    @InjectRepository(CalendarIntegrationType)
    private readonly _calendarIntegrationTypesRepository: Repository<CalendarIntegrationType>
  ) { }

  public async getCalendarIntegrations(accountId: number): Promise<CalendarIntegrationDto[]> {
    const integrations: CalendarIntegration[] = await this._calendarIntegrationsRepository.find({
      relations: ['calendarIntegrationType'],
      where: { account: {id: accountId } }
    });
    return CalendarIntegrationMapper.toCalendarIntegrationDtoList(integrations);
  }

  public async getCalendarIntegrationsGroupedByType(accountId: number): Promise<CalendarIntegrationTypeDto[]> {
    const integrationTypes: CalendarIntegrationType[] = await this._calendarIntegrationTypesRepository.find();

    if (!integrationTypes) throw new CalendarIntegrationTypeNotFoundException();
    
    const integrations: CalendarIntegration[] = await this._calendarIntegrationsRepository.find({
      relations: ['calendarIntegrationType'],
      where: { 
        account: { id: accountId }
      }
    });
    
    if (!integrations) throw new CalendarIntegrationNotFoundException();
    
    return CalendarIntegrationTypeMapper.toCalendIntegrationTypeDtoListWithIntegrations(
      integrationTypes, integrations
    );
  }

  public async refreshCalendarIntegration(
      accountId: number, 
      integrationId: number, 
      refreshCalendarIntegrationDto: CalendarIntegrationDto): Promise<CalendarIntegrationDto> {

    return {} as CalendarIntegration;
  }

  public async inactiveCalendarIntegration(
      accountId: number, 
      integrationId: number): Promise<CalendarIntegrationDto> {
    const integration: CalendarIntegration = await this._calendarIntegrationsRepository.findOne({
      where: {
        id: integrationId,
        account: { id: accountId }
      }
    });
    if (!integration) throw new CalendarIntegrationNotFoundException();
    this._calendarIntegrationsRepository.delete(integration.id);
    return CalendarIntegrationMapper.toCalendarIntegartionDto(integration);
  }
}
