import { Test, TestingModule } from '@nestjs/testing';
import { AutobusService } from './autobus.service';
import { AutobusController } from './autobus.controller';
import { Logger } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/auth.guard';
import { AutoBusDTO } from './dtos/autobus.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateAutoBusDTO } from './dtos/update-autobus.dto';
describe('AutobusController', () => {
  let controller: AutobusController;
  const mockedService = {
    create: jest.fn(),
    update: jest.fn()
  };
  const mockedAuthGuard = {
    canActivate: jest.fn()
  };
  const mockedLogger = {
    log: jest.fn()
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AutobusController],
      providers: [{ provide: AutobusService, useValue: mockedService }, { provide: Logger, useValue: mockedLogger }, UtilsService]
    })
      .overrideGuard(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();
    controller = app.get<AutobusController>(AutobusController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('expect create method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: AutoBusDTO = plainToInstance(AutoBusDTO, {
      model: {
        description: 'modelo 1',
        id: 3
      },
      brand: {
        description: 'Toyota',
        id: 1
      },
      seats: [
        {
          seatType: {
            description: 'cama asiento',
            id: 1,
            isActive: true
          }
        },
        {
          seatType: {
            description: 'cama simple',
            id: 2,
            isActive: true
          }
        },
        {
          seatType: {
            description: 'cama simple',
            id: 2,
            isActive: true
          }
        }
      ]
    });
    await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when create method fails', async () => {
    jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: AutoBusDTO = plainToInstance(AutoBusDTO, {
      model: {
        description: 'modelo 1',
        id: 3
      },
      brand: {
        description: 'Toyota',
        id: 1
      },
      seats: [
        {
          seatType: {
            description: 'cama asiento',
            id: 1,
            isActive: true
          }
        },
        {
          seatType: {
            description: 'cama simple',
            id: 2,
            isActive: true
          }
        },
        {
          seatType: {
            description: 'cama simple',
            id: 2,
            isActive: true
          }
        }
      ]
    });
    try {
      await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Error when update method fails', async () => {
    jest.spyOn(mockedService, 'update').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: UpdateAutoBusDTO = plainToInstance(UpdateAutoBusDTO, {
      asigned: true
    });
    try {
      await controller.update(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830', 1);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
