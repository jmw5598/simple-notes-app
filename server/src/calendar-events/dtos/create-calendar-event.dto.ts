import { IsNotEmpty } from 'class-validator';

export class CreateCalendarEventDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public startDateTime: Date;

  @IsNotEmpty()
  public endDateTime: Date;

  @IsNotEmpty()
  public isAllDay: boolean;

  @IsNotEmpty()
  public location: string;

  @IsNotEmpty()
  public description: string;
}