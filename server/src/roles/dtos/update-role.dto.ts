import { IsNotEmpty } from "class-validator";

export class UpdateRoleDto {
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  public name: string;
}
