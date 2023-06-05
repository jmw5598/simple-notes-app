import { SnDrawerOptions } from './drawer-options.model';
import { SnDrawerLocation } from './drawer-location.enum';
import { SnDrawerOverlayStyle } from './drawer-overlay-style.enum';
import { SnDrawerSize } from './drawer-size.enum';

export const DEFAULT_DRAWER_OPTIONS: SnDrawerOptions = {
  location: SnDrawerLocation.RIGHT,
  overlayStyle: SnDrawerOverlayStyle.DIM_DARK,
  size: SnDrawerSize.DEFAULT
};
