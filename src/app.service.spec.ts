import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppService ', () => {
  it('should expect to be defined', async () => {
    const appService: AppService = new AppService(new ConfigService());
    expect(appService).toBeDefined();
  });
  it('getHealth expected to be called', () => {
    const appService: AppService = new AppService(new ConfigService());
    const spy = jest.spyOn(appService, 'getHealth');
    appService.getHealth();
    expect(spy).toBeCalledTimes(1);
  });
});
