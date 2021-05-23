import { NotFoundException } from '@nestjs/common';

export class TodoNotFoundException extends NotFoundException {
  constructor() {
    super(`Todo with supplied id was not found!`);
  }
}
