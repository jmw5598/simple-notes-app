import { IsNotEmpty } from "class-validator";

export class UpdatePlanDto {
  @IsNotEmpty()
  public id:number;

  @IsNotEmpty()
  public name: string;
}
