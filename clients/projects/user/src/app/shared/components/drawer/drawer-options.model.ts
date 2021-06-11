import { DrawerLocation } from './drawer-location.enum';
import { DrawerOverlayStyle } from './drawer-overlay-style.enum';
import { DrawerSize } from './drawer-size.enum'; 

export interface DrawerOptions {
  location?: DrawerLocation;
  overlayStyle?: DrawerOverlayStyle;
  size?: DrawerSize;
  data?: any;
}
