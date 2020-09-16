import { IsNotEmpty } from 'class-validator';

export class UpdateSectionDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public synopsis: string;

  public notes: string;
}
