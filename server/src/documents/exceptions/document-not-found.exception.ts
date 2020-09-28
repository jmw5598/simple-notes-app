import { NotFoundException } from '@nestjs/common';

export class DocumentNotFoundException extends NotFoundException {
  constructor() {
    super(`Document with supplied id was not found!`);
  }
}
