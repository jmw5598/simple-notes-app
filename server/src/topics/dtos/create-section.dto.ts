import { IsNotEmpty } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public synopsis: string;

  public notes: string;
}
