import { OverlayStyle } from './overlay-style.enum';

export interface OverlayContentOptions {
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  overlayStyle?: OverlayStyle;
  data?: any;
}
