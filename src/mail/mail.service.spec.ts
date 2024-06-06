import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

describe('MailService', () => {
  const mockedConfigService = {
    get: jest.fn()
  };
  let service: MailService;
  const mockedLogger = {
    log: jest.fn()
  };
  const mockedMailerService = {
    sendMail: jest.fn()
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [MailService, { provide: Logger, useValue: mockedLogger }, { provide: ConfigService, useValue: mockedConfigService }, { provide: MailerService, useValue: mockedMailerService }]
    }).compile();
    service = app.get<MailService>(MailService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expect to be executed OK when calling send method ', async () => {
    mockedMailerService.sendMail.mockImplementationOnce(() => Promise.resolve({}));
    await service.send({ to: 'example@hotmail.com' });
  });
  it('expect an Error when calling send method ', async () => {
    mockedMailerService.sendMail.mockImplementationOnce(() => Promise.reject({}));
    await service.send({ to: 'example@hotmail.com' });
  });
});
