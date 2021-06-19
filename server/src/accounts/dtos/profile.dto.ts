import { AddressDto } from "./address.dto";

export class ProfileDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public firstName: string;
  public lastName: string;
  public email: string;
  public address: AddressDto;
}
