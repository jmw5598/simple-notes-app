import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { EmailerService } from '../../common/services/emailer/emailer.service';
import { Role } from '../../users/entities/role.entity';
import { User } from '../../users/entities/user.entity';

import { Account } from '../entities/account.entity';
import { Address } from '../entities/address.entity';
import { Profile } from '../entities/profile.entity';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RegistrationDto } from '../dtos/registration.dto';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { RegistrationResult } from '../dtos/registration-result.dto';
import { Roles } from '../../authentication/models/roles.enum';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Account)
    private readonly _accountRepository: Repository<Account>,
    @InjectRepository(Address)
    private readonly _addressRepository: Repository<Address>,
    @InjectRepository(Profile)
    private readonly _profileRepository: Repository<Profile>,
    @InjectRepository(Role)
    private readonly _roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _emailerService: EmailerService 
  ) {}

  public async registerNewAccount(registrationDto: RegistrationDto): Promise<any> {    
    const account: Account = await this._registerNewAccount(registrationDto.account);
    const user: User = await this._registerNewUser(registrationDto.user, account);
    const profile: Profile = await this._registerNewProfile(registrationDto.profile, account);
    // this._emailerService.sendConfirmationEmail(profile.email, account.comfirmationToken);
    return {
      status: "SUCCESS",
      message: "Registration was success.  Please check and confirm your email address."
    } as RegistrationResult;
  }

  private async _registerNewAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const account: Account = this._accountRepository.create({
      plan: createAccountDto.plan,
      isConfirmed: true,
      isEnabled: true
    });
    return this._accountRepository.save(account);
  }

  private async _registerNewUser(createUserDto: CreateUserDto, account: Account): Promise<User> {
    const userRole: Role = await this._roleRepository.findOne({ name: Roles.USER });
    console.log("user role", userRole);
    const resetTokenExpiration: Date = this._generateResetTokenExpiration();
    const user: User = this._userRepository.create({
      username: createUserDto.username.trim().toLowerCase(),
      password: this._hashPassword(createUserDto.password),
      account: { id: account.id },
      resetToken: uuidv4(),
      resetTokenExpiration: resetTokenExpiration,
      roles: [userRole]
    });  
    return this._userRepository.save(user);
  }

  private async _registerNewProfile(createProfileDto: CreateProfileDto, account: Account): Promise<Profile> {
    const address: Address = await this._registerNewAddress(createProfileDto.address);
    const profile: Profile = this._profileRepository.create({
      firstName: createProfileDto.firstName,
      lastName: createProfileDto.lastName,
      email: createProfileDto.email.trim().toLowerCase(),
      address: address,
      account: { id: account.id }
    });
    return this._profileRepository.save(profile);
  }

  private async _registerNewAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const address: Address = this._addressRepository.create({
      street: createAddressDto.street,
      street2: createAddressDto.street2,
      city: createAddressDto.city,
      state: createAddressDto.state,
      zip: createAddressDto.zip
    });
    return this._addressRepository.save(address);
  }

  private _generateResetTokenExpiration(): Date {
    const now: Date = new Date();
    now.setMinutes(now.getMinutes() + 10);
    return now;
  }

  private _hashPassword(password: string): string {
    return bcrypt.hashSync(password, 6);
  }
}
