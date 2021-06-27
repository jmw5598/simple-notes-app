import { NotFoundException } from '@nestjs/common';

export class RoleNotFoundException extends NotFoundException {
  constructor() {
    super(`Role with supplied id was not found!`);
  }
}