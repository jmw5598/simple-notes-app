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
import { SnLoggerService } from '../../logger/sn-logger.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly _accountsService: AccountsService,
    private readonly _configService: ConfigService,
    private readonly _logger: SnLoggerService
  ) {
    this._logger.setContext(this.constructor.name);
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
      this._logger.error(`Error registring account`, error);
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
      this._logger.error(`Error creating passsword reset request`, error);
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
      this._logger.error(`Error restting password`, error);
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
      this._logger.error(`Error checking if email exists`, error);
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
      this._logger.error(`Error checking if username exists`, error);
      throw error;
    }
  }
}
