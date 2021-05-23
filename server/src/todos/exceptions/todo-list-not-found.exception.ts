import { NotFoundException } from '@nestjs/common';

export class TodoListNotFoundException extends NotFoundException {
  constructor() {
    super(`Todo list with supplied id was not found!`);
  }
}
