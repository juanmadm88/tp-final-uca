import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTypeController } from './service-type.controller';
import { ServiceTypeService } from './service-type.service';
import { Logger } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { ServiceTypeDTO } from './dtos/service-type.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateServiceTypeDTO } from './dtos/update-service-type.dto';
describe('ServiceTypeController', () => {
  let controller: ServiceTypeController;
  const mockedServiceTypeService = {
    create: jest.fn(),
    update: jest.fn(),
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
      controllers: [ServiceTypeController],
      providers: [
        { provide: ServiceTypeService, useValue: mockedServiceTypeService },
        { provide: Logger, useValue: mockedLogger },
        { provide: UtilsService, useValue: mockedUtilsService }
      ]
    })
      .overrideGuard(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();
    controller = app.get<ServiceTypeController>(ServiceTypeController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('expect create method executed successfully', async () => {
    const spy = jest.spyOn(mockedServiceTypeService, 'create').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: ServiceTypeDTO = plainToInstance(ServiceTypeDTO, { description: 'primera clase' });
    await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when create method fails', async () => {
    jest.spyOn(mockedServiceTypeService, 'create').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: ServiceTypeDTO = plainToInstance(ServiceTypeDTO, { description: 'primera clase' });
    try {
      await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect update method executed successfully', async () => {
    const spy = jest.spyOn(mockedServiceTypeService, 'update').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: UpdateServiceTypeDTO = plainToInstance(UpdateServiceTypeDTO, { description: 'primera clase' });
    await controller.update(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830', 1);
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when update method fails', async () => {
    jest.spyOn(mockedServiceTypeService, 'update').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: UpdateServiceTypeDTO = plainToInstance(UpdateServiceTypeDTO, { description: 'primera clase' });
    try {
      await controller.update(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830', 1);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect findAll method executed successfully', async () => {
    const spy = jest.spyOn(mockedServiceTypeService, 'findAll').mockImplementation(() => Promise.resolve({ status: 200 }));
    await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when findAll method fails', async () => {
    jest.spyOn(mockedServiceTypeService, 'findAll').mockImplementation(() => Promise.reject({ status: 404 }));
    try {
      await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
