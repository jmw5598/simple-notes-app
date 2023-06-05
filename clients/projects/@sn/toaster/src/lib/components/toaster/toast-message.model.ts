export type SnToastType = 
  | 'primary' 
  | 'secondary' 
  | 'light' 
  | 'dark' 
  | 'success' 
  | 'info' 
  | 'warning' 
  | 'danger';

export type SnToasterLocation = 
  | 'topleft' 
  | 'topright' 
  | 'bottomleft' 
  | 'bottomright';

export class SnToastMessage {
  public id: number;
  public title?: string;
  public message: string;
  public options: SnToastMessageOptions;
}

export class SnToastMessageOptions {
  public type?: SnToastType;
  public isDismissible?: boolean;
  public autoRemove?: boolean;
  public duration?: number;
}

export const DEFAULT_TOAST_MESSAGE_OPTIONS: SnToastMessageOptions = {
  type: 'light',
  isDismissible: true,
  autoRemove: true,
  duration: 3000
}
