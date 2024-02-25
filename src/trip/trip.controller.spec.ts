import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { Logger } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { TripDTO } from './dtos/trip.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateTripDTO } from './dtos/update-trip.dto';
describe('TripController', () => {
  let controller: TripController;
  const mockedService = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn()
  };
  const mockedAuthGuard = {
    canActivate: jest.fn()
  };
  const mockedUtilsService = {
    buildOptions: jest.fn()
  };
  const mockedLogger = {
    log: jest.fn()
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        { provide: TripService, useValue: mockedService },
        { provide: Logger, useValue: mockedLogger },
        { provide: UtilsService, useValue: mockedUtilsService }
      ]
    })
      .overrideGuard(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();
    controller = app.get<TripController>(TripController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('expect create method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: TripDTO = plainToInstance(TripDTO, {
      departureDate: '2020-07-10T03:00:00.000Z',
      arrivalDate: '2020-07-11T03:00:00.000Z',
      origin: {
        description: 'mar de ajo',
        id: 1,
        kilometer: 350
      },
      destination: {
        description: 'mar de ajo',
        id: 1,
        kilometer: 350
      },
      id: 1,
      autobus: null,
      finished: true
    });
    await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when create method fails', async () => {
    jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: TripDTO = plainToInstance(TripDTO, {
      departureDate: '2020-07-10T03:00:00.000Z',
      arrivalDate: '2020-07-11T03:00:00.000Z',
      origin: {
        description: 'mar de ajo',
        id: 1,
        kilometer: 350
      },
      destination: {
        description: 'mar de ajo',
        id: 1,
        kilometer: 350
      },
      id: 1,
      autobus: null,
      finished: true
    });
    try {
      await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Error when update method fails', async () => {
    jest.spyOn(mockedService, 'update').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: UpdateTripDTO = plainToInstance(UpdateTripDTO, {
      asigned: true
    });
    try {
      await controller.update(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830', 1);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Error when findById service method fails', async () => {
    jest.spyOn(mockedService, 'findById').mockImplementation(() => Promise.reject({ status: 404 }));
    try {
      await controller.getById('9568be23-16c6-4d87-8dd0-614b34a6c830', 1);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Error when findAll service method fails', async () => {
    jest.spyOn(mockedService, 'findAll').mockImplementation(() => Promise.reject({ status: 404 }));
    try {
      await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830', { skip: 1, size: 3, departureDate: '2020-09-11', destinationDescription: 'mar de ajo', originDescription: 'mar del plata' });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect get method to be successfully executed ', async () => {
    jest.spyOn(mockedService, 'findAll').mockImplementation(() => Promise.resolve());
    await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830', undefined);
  });
});
