import { ProfileDto } from "../dtos/profile.dto";
import { Profile } from "../entities/profile.entity";
import { AddressMapper } from "./address.mapper";

export class ProfileMapper {
  public static toProfileDto(profile: Profile): ProfileDto {
    return {
      id: profile.id ? profile.id : -1,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      deletedAt: profile.deletedAt,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      address: AddressMapper.toAddressDto(profile.address)
    } as ProfileDto;
  }
}
