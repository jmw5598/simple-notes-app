import { AddressDto } from "../dtos/address.dto";
import { Address } from "../entities/address.entity";

export class AddressMapper {
  public static toAddressDto(address: Address): AddressDto {
    return {
      id: address.id ? address.id : -1,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
      deletedAt: address.deletedAt,
      street: address.street,
      street2: address.street2,
      city: address.city,
      state: address.state,
      zip: address.zip
    } as AddressDto;
  }
}
