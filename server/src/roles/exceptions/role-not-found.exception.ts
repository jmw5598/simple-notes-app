import { NotFoundException } from '@nestjs/common';

export class RoleEventNotFoundException extends NotFoundException {
  constructor() {
    super(`Role with supplied id was not found!`);
  }
}