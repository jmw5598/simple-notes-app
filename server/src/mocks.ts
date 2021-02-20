import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import  { Repository } from 'typeorm';
import { EmailerService } from './common/services/emailer/emailer.service';
import { SnLoggerService } from './logger/sn-logger.service';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

// @ts-ignore
export const snLoggerServiceMock: SnLoggerService = {
  setContext(context: string): void { },
  error(message: string, trace: string): void { },
  warn(message: string): void { },
  debug(message: string): void { },
  verbose(message: string): void { }
} as SnLoggerService

// @ts-ignore
export const emailerServiceMock: EmailerService = {
  async sendConfirmationEmail(email: string, code: string) {},
  async sendPasswordResetEmail(email: string, code: string) {}
} as EmailerService;

export const jwtServiceMock: JwtService = {
  sign(payload: any, options: JwtSignOptions): string { return ''; },
  decode(token: string, options: any) {}
} as JwtService;
