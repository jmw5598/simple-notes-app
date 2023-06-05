import { SnOverlayStyle } from './overlay-style.enum';
import { SnOverlayContentOptions } from "./overlay-content-options.model";

export const DEFAULT_OVERLAY_CONTENT_OPTIONS: SnOverlayContentOptions = {
  closeOnEscape: true,
  closeOnOverlayClick: true,
  overlayStyle: SnOverlayStyle.DIM_DARK,
  data: null
};
