import { NotFoundException } from '@nestjs/common';

export class PlanNotFoundException extends NotFoundException {
  constructor() {
    super(`Plan with supplied id was not found!`);
  }
}
