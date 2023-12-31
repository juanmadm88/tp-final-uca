import { Test, TestingModule } from '@nestjs/testing';
import { SeatTypeController } from './seat-type.controller';
import { SeatTypeService } from './seat-type.service';
import { Logger } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/auth.guard';
import { SeatTypeDTO } from './dtos/seat-type.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateSeatTypeDTO } from './dtos/update-service-type.dto';
describe('SeatTypeController', () => {
  let controller: SeatTypeController;
  const mockedSeatTypeService = {
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
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SeatTypeController],
      providers: [{ provide: SeatTypeService, useValue: mockedSeatTypeService }, { provide: Logger, useValue: mockedLogger }, UtilsService]
    })
      .overrideGuard(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();
    controller = app.get<SeatTypeController>(SeatTypeController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('expect create method executed successfully', async () => {
    const spy = jest.spyOn(mockedSeatTypeService, 'create').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: SeatTypeDTO = plainToInstance(SeatTypeDTO, { description: 'primera clase' });
    await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when create method fails', async () => {
    jest.spyOn(mockedSeatTypeService, 'create').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: SeatTypeDTO = plainToInstance(SeatTypeDTO, { description: 'primera clase' });
    try {
      await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect update method executed successfully', async () => {
    const spy = jest.spyOn(mockedSeatTypeService, 'update').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: UpdateSeatTypeDTO = plainToInstance(UpdateSeatTypeDTO, { description: 'primera clase' });
    await controller.update(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830', 1);
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when update method fails', async () => {
    jest.spyOn(mockedSeatTypeService, 'update').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: UpdateSeatTypeDTO = plainToInstance(UpdateSeatTypeDTO, { description: 'primera clase' });
    try {
      await controller.update(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830', 1);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect findAll method executed successfully', async () => {
    const spy = jest.spyOn(mockedSeatTypeService, 'findAll').mockImplementation(() => Promise.resolve({ status: 200 }));
    await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when findAll method fails', async () => {
    jest.spyOn(mockedSeatTypeService, 'findAll').mockImplementation(() => Promise.reject({ status: 404 }));
    try {
      await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
