import { NotFoundException } from '@nestjs/common';

export class ThemeNotFoundException extends NotFoundException {
  constructor() {
    super(`Theme was not found with the supplied id`);
  }
}
