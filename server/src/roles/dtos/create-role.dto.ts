import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty()
  public name: string;
}
