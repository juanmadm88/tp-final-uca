import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Logger } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/auth.guard';
import { TicketDTO } from './dtos/ticket.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateTicketDTO } from './dtos/update-ticket.dto';
describe('TicketController', () => {
  let controller: TicketController;
  const mockedService = {
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
      controllers: [TicketController],
      providers: [
        { provide: TicketService, useValue: mockedService },
        { provide: Logger, useValue: mockedLogger },
        { provide: UtilsService, useValue: mockedUtilsService }
      ]
    })
      .overrideGuard(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();
    controller = app.get<TicketController>(TicketController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('expect create method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: TicketDTO = plainToInstance(TicketDTO, {
      user: {
        id: 17
      },
      trip: {
        id: 5
      },
      serviceType: {
        id: 23
      },
      seat: {
        id: 31,
        booked: true
      }
    });
    await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when create method fails', async () => {
    jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: TicketDTO = plainToInstance(TicketDTO, {
      user: {
        id: 17
      },
      trip: {
        id: 5
      },
      serviceType: {
        id: 23
      },
      seat: {
        id: 31,
        booked: true
      }
    });
    try {
      await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect create update executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'update').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: UpdateTicketDTO = plainToInstance(UpdateTicketDTO, {
      user: {
        id: 17
      },
      trip: {
        id: 5
      },
      serviceType: {
        id: 23
      },
      seat: {
        id: 31,
        booked: true
      }
    });
    await controller.update(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830', 17);
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when update method fails', async () => {
    jest.spyOn(mockedService, 'update').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: UpdateTicketDTO = plainToInstance(UpdateTicketDTO, {
      user: {
        id: 17
      },
      trip: {
        id: 5
      },
      serviceType: {
        id: 23
      },
      seat: {
        id: 31,
        booked: true
      }
    });
    try {
      await controller.update(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830', 17);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Error when findAll service method fails', async () => {
    jest.spyOn(mockedService, 'findAll').mockImplementation(() => Promise.reject({ status: 404 }));
    try {
      await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830', {
        skip: 1,
        size: 3,
        tripDepartureDate: '2020-09-11',
        tripArrivalDate: '2020-09-11',
        tripDestinationDescription: 'mar de ajo',
        tripOriginDescription: 'mar del plata',
        username: 'pepito',
        serviceTypeDescription: 'primera clase',
        cancelled: 'false'
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect get method to be successfully executed ', async () => {
    jest.spyOn(mockedService, 'findAll').mockImplementation(() => Promise.resolve());
    await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830', undefined);
  });
});
