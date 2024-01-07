import { Test, TestingModule } from '@nestjs/testing';
import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';
import { Logger } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/auth.guard';
import { TerminalDTO } from './dtos/terminal.dto';
import { plainToInstance } from 'class-transformer';
describe('TerminalController', () => {
  let controller: TerminalController;
  const mockedService = {
    create: jest.fn(),
    findAll: jest.fn()
  };
  const mockedAuthGuard = {
    canActivate: jest.fn()
  };
  const mockedLogger = {
    log: jest.fn()
  };
  const mockedUtilsService = {
    buildOptions: jest.fn()
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TerminalController],
      providers: [
        { provide: TerminalService, useValue: mockedService },
        { provide: Logger, useValue: mockedLogger },
        { provide: UtilsService, useValue: mockedUtilsService }
      ]
    })
      .overrideGuard(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();
    controller = app.get<TerminalController>(TerminalController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('expect create method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: TerminalDTO = plainToInstance(TerminalDTO, { description: 'mar de ajo', kilometer: 300 });
    await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when create method fails', async () => {
    jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: TerminalDTO = plainToInstance(TerminalDTO, { description: 'mar de ajo', kilometer: 300 });
    try {
      await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect findAll method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'findAll').mockImplementation(() => Promise.resolve({ status: 200 }));
    await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when findAll method fails', async () => {
    jest.spyOn(mockedService, 'findAll').mockImplementation(() => Promise.reject({ status: 404 }));
    try {
      await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
