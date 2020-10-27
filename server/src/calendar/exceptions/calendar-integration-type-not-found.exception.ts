import { NotFoundException } from '@nestjs/common';

export class CalendarIntegrationTypeNotFoundException extends NotFoundException {
  constructor() {
    super(`Calendar integration type(s) were not found!`);
  }
}
