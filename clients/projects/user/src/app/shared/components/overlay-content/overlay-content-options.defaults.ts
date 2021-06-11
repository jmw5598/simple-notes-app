import { OverlayStyle } from './overlay-style.enum';
import { OverlayContentOptions } from "./overlay-content-options.model";

export const DEFAULT_OVERLAY_CONTENT_OPTIONS: OverlayContentOptions = {
  closeOnEscape: true,
  closeOnOverlayClick: true,
  overlayStyle: OverlayStyle.DIM_DARK,
  data: null
};
