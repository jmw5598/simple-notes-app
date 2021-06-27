import { IsNotEmpty } from "class-validator";

export class CreatePlanDto {
  @IsNotEmpty()
  public name: string;
}
