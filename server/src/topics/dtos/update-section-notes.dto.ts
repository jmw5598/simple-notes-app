import { IsNotEmpty } from 'class-validator';

export class UpdateSectionNotesDto {
  @IsNotEmpty()
  public topicId: number;

  @IsNotEmpty()
  public sectionId: number;

  public notes: string;
}