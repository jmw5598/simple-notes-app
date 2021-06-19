import { Controller, UseGuards, Get, Post, Request, Query, Redirect, Body, Head, Response, HttpCode, NotFoundException, UnprocessableEntityException, Put } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { RegistrationDto } from '../dtos/registration.dto';
import { RegistrationResult } from '../dtos/registration-result.dto';
import { PasswordResetDto } from '../dtos/password-reset.dto';
import { PasswordRequestResetDto } from '../dtos/password-request-reset.dto';
import { ResponseMessage } from '../../common/models/response-message.model';
import { ConfigService } from '@nestjs/config';
import { UpdateAccountDto } from '../dtos/update-account.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { JwtAdminRoleGuard } from '../../authentication/guards/jwt-admin-role.guard';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { SortDirection } from 'src/common/enums/sort-direction.enum';
import { Page } from 'src/common/models/page.model';
import { PageRequest } from 'src/common/models/page-request.model';
import { IPageable } from 'src/common/models/pageable.interface';
import { AccountDto } from '../dtos/account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _accountsService: AccountsService,
    private readonly _configService: ConfigService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  // @Post('')
  // @UseGuards(JwtAdminRoleGuard)
  // public async createAccount(@Body() registrationDto: RegistrationDto): Promise<RegistrationResult> {
  //   try {
  //     const result: RegistrationResult = await this._accountsService.registerNewAccount(registrationDto);
  //     const result: RegistrationResult = await this._accountsService.createAccount(registrationDto);
  //     return result;
  //   } catch (error) {
  //     this._logger.error(`Error creating account`, error);
  //     throw error;
  //   }
  // }

  @Get('search')
  @UseGuards(JwtAuthenticationGuard, JwtAdminRoleGuard)
  public async searchAccounts(
      @Request() request,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortCol') sortCol: string = 'createdAt',
      @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING,
      @Query('searchTerm') searchTerm: string = ''): Promise<Page<AccountDto>> {
    try {
      const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir); 
      return this._accountsService.searchAccounts(searchTerm, pageable); 
    } catch (error) {
      this._logger.error('Error searching accounts!', error);
      throw error;
    }
  }

  @Get('details')
  @UseGuards(JwtAuthenticationGuard)
  public async getAccountDetails(@Request() req): Promise<any> {
    try {
      const accountId: number = +req.user.accountId;  
      return this._accountsService.getAccountDetails(accountId);
    } catch (error) {
      this._logger.error(`Error getting account details`, error);
      throw error;
    }
  }
 
  @Put('details')
  @UseGuards(JwtAuthenticationGuard)
  public async udpateAccountDetails(
      @Request() req, 
      @Body() updateAccountDto: UpdateAccountDto): Promise<any> {
    try {
      const accountId: number = +req.user.accountId;
      return this._accountsService.updateAccountDetails(accountId, updateAccountDto);
    } catch (error) {
      this._logger.error(`Error updating account details`, error);
      throw error;
    }
  }

  @Put('profile')
  @UseGuards(JwtAuthenticationGuard)
  public async updateAccountProfile(
      @Request() req, 
      @Body() updateProfileDto: UpdateProfileDto): Promise<any> {
    try {
      const accountId: number = +req.user.accountId;
      return this._accountsService.updateAccountProfile(accountId, updateProfileDto);
    } catch (error) {
      this._logger.error(`Error updating account profile`, error);
      throw error;
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthenticationGuard)
  public async getAccountProfile(@Request() req): Promise<any> {
    try {
      const accountId: number = +req.user.accountId;
      return this._accountsService.getAccountProfile(accountId);
    } catch (error) {
      this._logger.error(`Error getting account profile`, error);
      throw error;
    }
  }

  @Post('register')
  public async registerAccount(@Body() registrationDto: RegistrationDto): Promise<RegistrationResult> {
    try {
      const result: RegistrationResult = await this._accountsService.registerNewAccount(registrationDto);
    return result;
    } catch (error) {
      this._logger.error(`Error registering account`, error);
      throw error;
    }
  }

  @Get('verify')
  @Redirect('https://inv.io', 301)
  public async verifyAccount(@Query('code') code: string): Promise<any> {
    try {
      const response: ResponseMessage = await this._accountsService.confirmAccount(code);
      const redirect: string = this._configService.get('MAIL_CONFIRMATION_REDIRECT_URL');
      return {
        url: `${redirect}?message=${encodeURI(response.message)}`
      };
    } catch (error) {
      this._logger.error(`Error verifying account`, error);
      throw error;
    }
  }

  @Post('password-request')
  public async passwordResetRequest(
      @Body() passwordRequestDto: PasswordRequestResetDto): Promise<ResponseMessage> {
    try {
      return this._accountsService.passwordRequestReset(passwordRequestDto.email);
    } catch (error) {
      this._logger.error(`Error requesting password reset`, error);
      throw error;
    }
  }

  @Post('password-reset')
  public async passwordReset(@Body() passwordResetDto: PasswordResetDto): Promise<ResponseMessage> {
    try {
      if (passwordResetDto.password !== passwordResetDto.passwordConfirm)
        throw new UnprocessableEntityException(`Password and confirmation password must match`);
      return this._accountsService
        .passwordResetFromResetToken(passwordResetDto.password, passwordResetDto.code)
    } catch (error) {
      this._logger.error(`Error resetting password`, error);
      throw error;
    }
    
  }

  @Head('validate/email')
  public async validateEmail(
      @Request() req, 
      @Response() res, 
      @Query('email') email: string): Promise<void> {
    try {
      if (!await this._accountsService.doesEmailExist(email)) {
        throw new NotFoundException(`Email, ${email}, doesn't exist`);
      }
      return res.status(204).send();
    } catch (error) {
      this._logger.error(`Error validating email`, error);
      throw error;
    }
  }

  @Head('validate/username')
  public async validateUsername(
      @Request() req,
      @Response() res,
      @Query('username') username: string): Promise<void> {
    try {
      if (!await this._accountsService.doesUsernameExist(username)) {
        throw new NotFoundException(`Username, ${username}, doesn't exist`);
      }
      return res.status(204).send();
    } catch (error) {
      this._logger.error(`Error validating username`, error);
      throw error;
    }
  }
}
