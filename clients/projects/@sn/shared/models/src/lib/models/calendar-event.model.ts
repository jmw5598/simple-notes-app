import { BaseModel } from './base.model';

export class CalendarEvent extends BaseModel {
  public title: string;
  public startDateTime: Date;
  public endDateTime: Date;
  public isAllDay: boolean;
  public color: string;
  public location: string;
  public description: string;
}
