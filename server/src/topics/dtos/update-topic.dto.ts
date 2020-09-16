import { IsNotEmpty } from 'class-validator';

export class UpdateTopicDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public synopsis: string;

  // TODO categories....
}
