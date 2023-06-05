import { SnDrawerLocation } from './drawer-location.enum';
import { SnDrawerOverlayStyle } from './drawer-overlay-style.enum';
import { SnDrawerSize } from './drawer-size.enum'; 

export interface SnDrawerOptions {
  location?: SnDrawerLocation;
  overlayStyle?: SnDrawerOverlayStyle;
  size?: SnDrawerSize;
  data?: any;
}
