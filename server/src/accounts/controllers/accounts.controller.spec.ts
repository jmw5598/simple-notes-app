import { ConfigService } from '@nestjs/config';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmailerService } from '../../common/services/emailer/emailer.service';
import { Role } from '../../users/entities/role.entity';
import { User } from '../../users/entities/user.entity';
import { repositoryMockFactory, emailerServiceMock, snLoggerServiceMock, responseMock } from '../../mocks';
import { Account } from '../entities/account.entity';
import { Address } from '../entities/address.entity';
import { Profile } from '../entities/profile.entity';
import { AccountsService } from '../services/accounts.service';
import { AccountsController } from './accounts.controller';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { Plan } from 'src/plans/entities/plan.entity';
import { AccountNotFoundException } from '../exceptions/account-not-found.exception';
import { UpdateAccountDto } from '../dtos/update-account.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { RegistrationDto } from '../dtos/registration.dto';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RegistrationResult } from '../dtos/registration-result.dto';
import { ProfileNotFoundException } from '../exceptions/profile-not-found.exception';
import { ResponseMessage } from '../../common/models/response-message.model';
import { ResponseStatus } from '../../common/enums/response-status.enum';
import { PasswordResetDto } from '../dtos/password-reset.dto';
import { PasswordRequestResetDto } from '../dtos/password-request-reset.dto';


describe('Accounts Controller', () => {
  let controller: AccountsController;
  let logger: SnLoggerService;
  let accountsService: AccountsService;

  const requestMock = { user: { accountId: '1' } };

  const accountDetailsMock: Partial<Account> = {
    createdAt: new Date('2020-09-28T23:24:40.640Z'),
    id: 2,
    isConfirmed: true,
    plan: { id: 1, name: 'Test' } as Plan,
    updatedAt: new Date('2021-02-18T17:54:19.448Z')
  }

  const accountProfileMock: Partial<Profile> = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
      street: '1234 Main',
      city: 'City',
      state: 'State',
      zip: '123456'
    } as Address
  };

  const registrationDtoMock: RegistrationDto = {
    account: { plan: { id: 1, name: 'Test' } } as CreateAccountDto,
    profile: { firstName: 'John', lastName: 'Doe' } as CreateProfileDto,
    user: { username: 'username', password: 'password', passwordConfirm: 'password' } as CreateUserDto
  } as RegistrationDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        AccountsController
      ],
      providers: [
        AccountsService,
        ConfigService,
        {
          provide: SnLoggerService,
          useValue: snLoggerServiceMock
        },
        {
          provide: EmailerService,
          useValue: emailerServiceMock
        },
        { 
          provide: getRepositoryToken(Account), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Address), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Profile), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Role), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(User), 
          useFactory: repositoryMockFactory
        }
      ]
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    logger = module.get<SnLoggerService>(SnLoggerService);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call AccountsService.getAccountDetails when getAccountDetails is called', async () => {
    spyOn(accountsService, 'getAccountDetails').and.returnValue(accountDetailsMock);
    const result: Partial<Account> = await controller.getAccountDetails(requestMock);
    expect(accountsService.getAccountDetails).toHaveBeenCalledWith(+requestMock.user.accountId);
    expect(result).toEqual(accountDetailsMock);
  });

  it('should catch and log error when AccountsService.getAccountDetails throws an error', async () => {
    spyOn(accountsService, 'getAccountDetails').and.callFake(() => { throw new AccountNotFoundException() });
    spyOn(logger, 'error');
    try {
      await controller.getAccountDetails(requestMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  });

  it('should call AccountsService.updateAccountDetails when updateAccountDetails is called', async () => {
    spyOn(accountsService, 'updateAccountDetails').and.returnValue(accountDetailsMock);
    const updateAccountDtoMock : UpdateAccountDto = {plan: { id: 1, name: 'Test' } as Plan };
    const result: Partial<Account> = await controller.udpateAccountDetails(requestMock, updateAccountDtoMock);
    expect(accountsService.updateAccountDetails).toHaveBeenCalledWith(+requestMock.user.accountId, updateAccountDtoMock);
    expect(result).toEqual(accountDetailsMock);
  });  

  it('should catch and log error when AccountsService.updateAccountDetails throws an error', async () => {
    spyOn(accountsService, 'updateAccountDetails').and.callFake(() => { throw new AccountNotFoundException() });
    spyOn(logger, 'error');
    try {
      const updateAccountDtoMock : UpdateAccountDto = {plan: { id: 1, name: 'Test' } as Plan };
      await controller.udpateAccountDetails(requestMock, updateAccountDtoMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  });
  
  it('should call AccountsService.updateAccountProfile when updateAccountDetails is called', async () => {
    spyOn(accountsService, 'updateAccountProfile').and.returnValue(accountProfileMock);
    const updateProfileDtoMock: UpdateProfileDto = { 
      firstName: 'John',
      lastName: 'Doe',
      address: {
        street: '1234 Main',
        city: 'City',
        state: 'State',
        zip: '123456'
      } as Address
    } as UpdateProfileDto;
    const result: Partial<Profile> = await controller.updateAccountProfile(requestMock, updateProfileDtoMock);
    expect(accountsService.updateAccountProfile).toHaveBeenCalledWith(+requestMock.user.accountId, updateProfileDtoMock);
    expect(result).toEqual(accountProfileMock);
  });

  it('should catch and log error when AccountsService.updateAccountDetails throws and error', async () => {
    spyOn(accountsService, 'updateAccountProfile').and.callFake(() => { throw new AccountNotFoundException() });
    spyOn(logger, 'error');
    try {
      const updateProfileDtoMock: UpdateProfileDto = { 
        firstName: 'John',
        lastName: 'Doe',
        address: {
          street: '1234 Main',
          city: 'City',
          state: 'State',
          zip: '123456'
        } as Address
      } as UpdateProfileDto;
      await controller.updateAccountProfile(requestMock, updateProfileDtoMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  });

  it('should call AccountsService.getAccountProfile when getAccountProfile is called', async () => {
    spyOn(accountsService, 'getAccountProfile').and.returnValue(accountProfileMock);
    const result: Partial<Profile> = await controller.getAccountProfile(requestMock);
    expect(accountsService.getAccountProfile).toHaveBeenCalledWith(+requestMock.user.accountId);
    expect(result).toEqual(accountProfileMock);
  });

  it('should catch and log error when AccountsService.getAccountProfile throws an error', async () => {
    spyOn(accountsService, 'getAccountProfile').and.callFake(() => { throw new ProfileNotFoundException() });
    spyOn(logger, 'error');
    try {
      await controller.getAccountProfile(requestMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(ProfileNotFoundException);
    }
  });

  it('should call AccountsService.registerNewAccount when registerAccount is called', async () => {
    const registrationResultMock: RegistrationResult = {
      message: `New account created`,
      status: 'SUCCESS'
    } as RegistrationResult;
    spyOn(accountsService, 'registerNewAccount').and.returnValue(registrationResultMock);
    const result: Partial<RegistrationResult> = await controller.registerAccount(registrationDtoMock);
    expect(accountsService.registerNewAccount).toHaveBeenCalledWith(registrationDtoMock);
    expect(result).toEqual(registrationResultMock);
  });

  it('should catch and log error when AccountsService.registerNewAccount throws and error', async () => {
    spyOn(accountsService, 'registerNewAccount').and.callFake(() => { throw new UnprocessableEntityException(); });
    spyOn(logger, 'error');
    try {
      await controller.registerAccount(registrationDtoMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });

  it('should redirect after Account verification is successful when verifyAccount is called', async () => {
    const verificationResponseMessageMock: ResponseMessage = {
      message: `Verification successful`,
      status: ResponseStatus.SUCCESS
    } as ResponseMessage;
    spyOn(accountsService, 'confirmAccount').and.returnValue(verificationResponseMessageMock);
    const verificationCodeMock: string = '1234abcd';
    const result: object = await controller.verifyAccount(verificationCodeMock);
    expect(accountsService.confirmAccount).toBeCalledWith(verificationCodeMock);
    expect(result.hasOwnProperty('url')).toBe(true);
  });

  it('should catch and log error when Account verification fails', async () => {
    const verificationCodeMock: string = '1234abcd';
    spyOn(accountsService, 'confirmAccount').and.callFake(() => { throw new UnprocessableEntityException(); });
    spyOn(logger, 'error');
    try {
      await controller.verifyAccount(verificationCodeMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });

  it('should called AccountsService.passwordReqeustReset when passwordResetRequest is called with a valid email', async () => {
    const passwordResetRequestDtoMock: PasswordRequestResetDto = {
      email: 'email@email.com'
    } as PasswordRequestResetDto; 
    const responseMessageMock: ResponseMessage = {
      message: `Email sent`,
      status: ResponseStatus.SUCCESS
    } as ResponseMessage;
    spyOn(accountsService, 'passwordRequestReset').and.returnValue(responseMessageMock);
    const result: ResponseMessage = await controller.passwordResetRequest(passwordResetRequestDtoMock);
    expect(accountsService.passwordRequestReset).toHaveBeenCalledWith(passwordResetRequestDtoMock.email);
    expect(result).toEqual(responseMessageMock);
  });

  it('should catch and log error when passwordResetRequest is called and throws and error', async () => {
    const passwordResetRequestDtoMock: PasswordRequestResetDto = {
      email: 'email@email.com'
    } as PasswordRequestResetDto;
    spyOn(accountsService, 'passwordRequestReset').and.callFake(() => { throw new UnprocessableEntityException(); });
    spyOn(logger, 'error');
    try {
      await controller.passwordResetRequest(passwordResetRequestDtoMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });

  it('should call AccountsService.passwordResetFromResetToken when passwordReset is called with a valid token', async () => {
    const responseMessageMock: ResponseMessage = {
      message: 'Password reset successful',
      status: ResponseStatus.SUCCESS
    } as ResponseMessage;
    spyOn(accountsService, 'passwordResetFromResetToken').and.returnValue(responseMessageMock);
    const passwordResetDtoMock: PasswordResetDto = {
      code: 'reset-token',
      password: 'password',
      passwordConfirm: 'password'
    } as PasswordResetDto;
    const result: ResponseMessage = await controller.passwordReset(passwordResetDtoMock);
    expect(accountsService.passwordResetFromResetToken).toHaveBeenCalledWith(passwordResetDtoMock.password, passwordResetDtoMock.code);
    expect(result).toEqual(responseMessageMock);
  });

  it('should throw error when password and passwordConfirm of PasswordResetDto are not equal', async () => {
    spyOn(logger, 'error');
    const passwordResetDtoMock: PasswordResetDto = {
      code: 'reset-token',
      password: 'password',
      passwordConfirm: 'passwordAgain'
    } as PasswordResetDto;
    try {
      await controller.passwordReset(passwordResetDtoMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });

  it('should throw, catch and handle NotFoundException when AccountsService.doesEmailExist return false', async () => {
    const email: string = `email@email.com`;
    spyOn(accountsService, 'doesEmailExist').and.returnValue(false);
    spyOn(logger, 'error');
    try {
      await controller.validateEmail(requestMock, responseMock, email);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should call response status with 204 and send when AccountsService.doesEmailExist return true', async () => {
    const email: string = `email@email.com`;
    spyOn(accountsService, 'doesEmailExist').and.returnValue(true);
    spyOn(responseMock, 'send');
    spyOn(responseMock, 'status').and.callThrough();;
    await controller.validateEmail(requestMock, responseMock, email);
    expect(responseMock.status).toHaveBeenLastCalledWith(204);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
  });

  it('should throw, catch, and handle NotFoundException when AccountService.doesUsernameExist return false', async () => {
    const username: string = `usernameToSearchFor`;
    spyOn(accountsService, 'doesUsernameExist').and.returnValue(false);
    spyOn(logger, 'error');
    try {
      await controller.validateUsername(requestMock, responseMock, username);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should call respsonse status with 204 adn send when AccountService.doesUsernameExist return true', async () => {
    const username: string = 'usernameToSearchFor';
    spyOn(accountsService, 'doesUsernameExist').and.returnValue(true);
    spyOn(responseMock, 'send');
    spyOn(responseMock, 'status').and.callThrough();
    await controller.validateUsername(requestMock, responseMock, username);
    expect(responseMock.status).toHaveBeenCalledWith(204);
    expect(responseMock.send).toHaveBeenCalledTimes(1);
  });
});
