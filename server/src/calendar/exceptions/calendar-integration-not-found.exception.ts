import { NotFoundException } from '@nestjs/common';

export class CalendarIntegrationNotFoundException extends NotFoundException {
  constructor() {
    super(`Calendar integration with supplied id was not found!`);
  }
}
