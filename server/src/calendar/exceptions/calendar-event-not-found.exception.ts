import { NotFoundException } from '@nestjs/common';

export class CalendarEventNotFoundException extends NotFoundException {
  constructor() {
    super(`Calendar event with supplied id was not found!`);
  }
}
