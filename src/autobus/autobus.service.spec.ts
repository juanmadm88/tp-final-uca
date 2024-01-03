import { Test, TestingModule } from '@nestjs/testing';
import { AutobusService } from './autobus.service';
import { UtilsService } from '../utils/utils.service';
import { plainToInstance } from 'class-transformer';
import { AutoBusDTO } from './dtos/autobus.dto';
import { DataSource } from 'typeorm';
import { UpdateAutoBusDTO } from './dtos/update-autobus.dto';

describe('AutobusService', () => {
  let service: AutobusService;
  const mockedUtilsService = {
    buildDTO: jest.fn()
  };
  const mockedManager = {
    save: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn()
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
  it('expect update method executed successfully ', async () => {
    await service.update(
      1,
      plainToInstance(UpdateAutoBusDTO, {
        asigned: false,
        seats: [
          {
            id: 1,
            booked: true
          }
        ]
      })
    );
  });
  it('expect an Error when update method fails ', async () => {
    jest.spyOn(mockedManager, 'update').mockImplementationOnce(() => Promise.reject({ error: 'some error' }));
    try {
      await service.update(
        1,
        plainToInstance(UpdateAutoBusDTO, {
          asigned: false,
          seats: [
            {
              id: 1,
              booked: true
            }
          ]
        })
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Array of Autobuses when find method is called ', async () => {
    const result: Array<any> = [
      {
        model: {
          description: 'modelo 1',
          id: 3
        },
        brand: {
          description: 'Toyota',
          id: 1
        },
        asigned: false,
        id: 11,
        seats: [
          {
            seatType: {
              description: 'cama asiento',
              id: 1,
              isActive: true
            },
            id: 22,
            booked: false
          },
          {
            seatType: {
              description: 'cama simple',
              id: 2,
              isActive: true
            },
            id: 23,
            booked: false
          },
          {
            seatType: {
              description: 'cama simple',
              id: 2,
              isActive: true
            },
            id: 24,
            booked: false
          }
        ]
      }
    ];
    const dto: Array<AutoBusDTO> = plainToInstance(AutoBusDTO, result);
    jest.spyOn(mockedManager, 'find').mockImplementationOnce(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementationOnce(() => Promise.resolve(dto));
    const response = await service.findAll({ skip: 2, take: 1 });
    expect(response).toBeDefined();
  });
  it('expect an Array of Autobuses when find method is called ', async () => {
    const result = {
      model: {
        description: 'modelo 1',
        id: 3
      },
      brand: {
        description: 'Toyota',
        id: 1
      },
      asigned: false,
      id: 11,
      seats: [
        {
          seatType: {
            description: 'cama asiento',
            id: 1,
            isActive: true
          },
          id: 22,
          booked: false
        },
        {
          seatType: {
            description: 'cama simple',
            id: 2,
            isActive: true
          },
          id: 23,
          booked: false
        },
        {
          seatType: {
            description: 'cama simple',
            id: 2,
            isActive: true
          },
          id: 24,
          booked: false
        }
      ]
    };
    const dto: AutoBusDTO = plainToInstance(AutoBusDTO, result);
    jest.spyOn(mockedManager, 'findOne').mockImplementationOnce(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementationOnce(() => Promise.resolve(dto));
    const response = await service.findById(1);
    expect(response).toBeDefined();
  });
});
