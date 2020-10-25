export class CalendarEventDto {
  public id: number;
  public title: string;
  public startDateTime: Date;
  public endDateTime: Date;
  public isAllDay: boolean;
  public color: string;
  public location: string;
  public description: string;
}
