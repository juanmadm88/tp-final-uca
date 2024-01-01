import { Test, TestingModule } from '@nestjs/testing';
import { AutobusService } from './autobus.service';
import { UtilsService } from '../utils/utils.service';
import { plainToInstance } from 'class-transformer';
import { AutoBusDTO } from './dtos/autobus.dto';
import { DataSource } from 'typeorm';

describe('AutobusService', () => {
  let service: AutobusService;
  const mockedUtilsService = {
    buildDTO: jest.fn()
  };
  const mockedManager = {
    save: jest.fn()
  };
  const mockedDataSource = {
    createQueryRunner: () => {
      return {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        release: jest.fn(),
        manager: mockedManager
      };
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutobusService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: DataSource, useValue: mockedDataSource }]
    }).compile();
    service = module.get<AutobusService>(AutobusService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expect create method executed successfully ', async () => {
    await service.create(
      plainToInstance(AutoBusDTO, {
        id: 1,
        asigned: false,
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
            booked: true,
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
      })
    );
  });
  it('expect an Error when create method fails ', async () => {
    jest.spyOn(mockedManager, 'save').mockImplementationOnce(() => Promise.reject({ error: 'some error' }));
    try {
      await service.create(
        plainToInstance(AutoBusDTO, {
          id: 1,
          asigned: false,
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
              booked: true,
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
        })
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
