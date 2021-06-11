import { DrawerOptions } from './drawer-options.model';
import { DrawerLocation } from './drawer-location.enum';
import { DrawerOverlayStyle } from './drawer-overlay-style.enum';
import { DrawerSize } from './drawer-size.enum';

export const DEFAULT_DRAWER_OPTIONS: DrawerOptions = {
  location: DrawerLocation.RIGHT,
  overlayStyle: DrawerOverlayStyle.DIM_DARK,
  size: DrawerSize.DEFAULT
};
