import { IsNotEmpty } from 'class-validator';

export class UpdateCalendarEventDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public startDateTime: Date;

  @IsNotEmpty()
  public endDateTime: Date;

  @IsNotEmpty()
  public location: string;

  @IsNotEmpty()
  public description: string;
}
