import { NotFoundException } from '@nestjs/common';

export class KeyboardShortcutNotFoundException extends NotFoundException {
  constructor() {
    super(`Keyboard shortcut was not found with the supplied id`);
  }
}
