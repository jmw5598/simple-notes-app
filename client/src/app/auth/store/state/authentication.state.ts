import { AuthenticatedUser, ResponseMessage } from '@sn/core/models';
import { AuthenticatedStatus } from '@sn/core/enums';
import { RegistrationResult } from '@sn/core/dtos';

export const authenticationFeatureKey: string = 'authentication';

export interface IAuthenticationState {
  authenticatedUser: AuthenticatedUser;
  authenticatedStatus: AuthenticatedStatus;
  errorMessage: string;
  registrationResult: RegistrationResult,
  passwordRequestResetResult: ResponseMessage,
  passwordResetResult: ResponseMessage
}

export const initialAuthenticationState: IAuthenticationState = {
  authenticatedUser: null,
  authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
  errorMessage: null,
  registrationResult: null,
  passwordRequestResetResult: null,
  passwordResetResult: null
}
