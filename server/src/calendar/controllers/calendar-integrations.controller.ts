import { Controller, Get, Redirect, UseGuards, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { ResponseMessage } from '../../common/models/response-message.model';
import { ResponseStatus } from '../../common/enums/response-status.enum';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { CalendarIntegrationDto } from '../dtos/calendar-integration.dto';
import { CalendarIntegrationTypeDto } from '../dtos/calendar-integration-type.dto';
import { CalendarIntegrationsService } from '../services/calendar-integrations.service';

@Controller('calendar/integrations')
@UseGuards(JwtAuthenticationGuard)
export class CalendarIntegrationsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _configService: ConfigService,
    private readonly _calendarIntegrationsService: CalendarIntegrationsService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get()
  public async getCalendarIntegration(@Request() request): Promise<CalendarIntegrationDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._calendarIntegrationsService.getCalendarIntegrations(accountId);
    } catch (error) {
      this._logger.error(`Error getting calendar integrations, please try gain!`, error);
      throw error;
    }
  }

  @Get('bytype')
  public async getCalendarIntegrationsGroupedByType(@Request() request): Promise<CalendarIntegrationTypeDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._calendarIntegrationsService.getCalendarIntegrationsGroupedByType(accountId); 
    } catch (error) {
      this._logger.error(`Error getting calendar integrations, please try again!`, error);
      throw error;
    }
  }

  @Get('google')
  @Redirect('https://jasonwhite.xyz', 301)
  public async authenticateGoogleCalendarIntegration(): Promise<any> {
    try {
      // This should redirect to google oauth to authentication, should send redirect URL to hit endpoint aftuer authentication
      // The redirect endpoint will get authenticaiton code which it will exchange for token set.
      // After getting the token set, the token set should be saved to the database.

      // TODO
      // Create calendar intergration service to save token set to database.

      // May have to create a integration authentication token that gets append the the redirect URI

      // Another option is to have the oauth flow start from the frontend, the redirect uri is to the frontend the frontend then calles
      // the backed with the autho code and the backend exchanges the auth code for the tokens
      const googleOAuthUrl: string = this._configService.get('GOOGLE_CALENDAR_INTEGRATION_AUTHORIZATION_URL');
      const clientId: string = this._configService.get('GOOGLE_CALENDAR_INTEGRATION_CLIENT_ID');
      const clientSecret: string = this._configService.get('GOOGLE_CALENDAR_INTEGRATION_CLIENT_SECRET');
      const callbackUrl: string = this._configService.get('GOOGLE_CALENDAR_INTEGRATION_CALLBACK_URL');
      
      // TODO Generate token save to database, add to callbackurl to be read in and looked up by the calback endpoint
      // this mightnight work, callback might have to be to client then client dispatches event that calls backed which exchanges code for tokesn
      // and saves tokens to db

      const redirectUrl: string = `${googleOAuthUrl}?client_id=${clientId}&client_secret=${clientSecret}&callback=${callbackUrl}`;
      console.log(redirectUrl);
      return { url: redirectUrl }
    } catch (error) {
      this._logger.error(`There was an error creating you google calendar intergrtaion`, error);
      throw error;
    }
  }
  
  @Get('google/authorized')
    public async createGoogleCalendarIntegration(): Promise<ResponseMessage> {
      try {

        // not sure how this is going to get the user the integration is for?
        // May have to create a token that get attached to the redirect URI when authenticaiton.
        // This token is then used to look up the user data??s
        return {
          message: 'Successfully created integration with google calendar',
          status: ResponseStatus.SUCCESS
        } as ResponseMessage;
      } catch (error) {
        this._logger.error(`There was an error creating your google calendar intergration, please try again.`, error)        
      }
    }
}
