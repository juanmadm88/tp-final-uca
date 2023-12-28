import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { WinstonModule } from 'nest-winston';

describe('LoggerService', () => {
  let loggerService: LoggerService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService]
    }).compile();
    loggerService = module.get<LoggerService>(LoggerService);
  });
  it('should be defined', () => {
    expect(loggerService).toBeDefined();
  });
  it('expect loggin error message ', () => {
    const logger = WinstonModule.createLogger(loggerService.createLoggerConfig);
    logger.log({
      level: 'error',
      message: 'An Error occurred while trying to log',
      err: { status: 404 }
    });
  });
  it('expect loggin level info message when level is not passed ', () => {
    const logger = WinstonModule.createLogger(loggerService.createLoggerConfig);
    logger.log({
      message: 'Logging Response ',
      req: { data: { id: 1 } }
    });
  });
});
