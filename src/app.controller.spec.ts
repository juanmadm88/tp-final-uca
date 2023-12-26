import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService]
    }).compile();

    appService = await app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return status 200', () => {
      const result = { code: 200 };
      jest.spyOn(appService, 'getHealth').mockImplementation(() => result);
      expect(appController.getHealth()).toEqual(result);
    });
  });
});
