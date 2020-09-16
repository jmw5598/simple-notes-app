import { IsNotEmpty } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public synopsis: string;

  // TODO categories....
}
