export type ToastType = 
  | 'primary' 
  | 'secondary' 
  | 'light' 
  | 'dark' 
  | 'success' 
  | 'info' 
  | 'warning' 
  | 'danger';

export type ToasterLocation = 
  | 'topleft' 
  | 'topright' 
  | 'bottomleft' 
  | 'bottomright';

export class ToastMessage {
  public id: number;
  public message: string;
  public options: ToastMessageOptions;
}

export class ToastMessageOptions {
  public type?: ToastType;
  public isDismissible?: boolean;
  public autoRemove?: boolean;
  public duration?: number;
}

export const DEFAULT_TOAST_MESSAGE_OPTIONS: ToastMessageOptions = {
  type: 'light',
  isDismissible: true,
  autoRemove: true,
  duration: 3000
}
