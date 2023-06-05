import { SnOverlayStyle } from './overlay-style.enum';

export interface SnOverlayContentOptions {
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  overlayStyle?: SnOverlayStyle;
  data?: any;
}
