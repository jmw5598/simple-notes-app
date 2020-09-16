import { NotFoundException } from '@nestjs/common';

export class TopicNotFoundException extends NotFoundException {
  constructor() {
    super(`Topic with supplied id was not found!`);
  }
}
