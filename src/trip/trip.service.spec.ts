import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from './trip.service';
import { UtilsService } from '../utils/utils.service';
import { plainToInstance } from 'class-transformer';
import { TripDTO } from './dtos/trip.dto';
import { DataSource } from 'typeorm';
import { UpdateTripDTO } from './dtos/update-trip.dto';
import { AutoBusDTO } from '../autobus/dtos/autobus.dto';

describe('TripService', () => {
  let service: TripService;
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
    },
    getRepository: () => {
      return {
        createQueryBuilder: () => {
          return {
            innerJoinAndSelect: () => {
              return {
                innerJoinAndSelect: () => {
                  return {
                    innerJoinAndSelect: () => {
                      return {
                        where: () => {
                          return {
                            skip: () => {
                              return {
                                take: () => {
                                  return {
                                    getMany: jest.fn()
                                  };
                                }
                              };
                            }
                          };
                        }
                      };
                    }
                  };
                }
              };
            }
          };
        }
      };
    }
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: DataSource, useValue: mockedDataSource }]
    }).compile();
    service = module.get<TripService>(TripService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expect create method executed successfully ', async () => {
    await service.create(
      plainToInstance(TripDTO, {
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
        autobus: {
          id: 1
        },
        finished: true
      })
    );
  });
  it('expect an Error when create method fails ', async () => {
    jest.spyOn(mockedManager, 'save').mockImplementationOnce(() => Promise.reject({ error: 'some error' }));
    try {
      await service.create(
        plainToInstance(TripDTO, {
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
        })
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect find all to be executed successfully ', async () => {
    await service.findAll({ where: { originDescription: 'mar de ajo' } });
  });
  it('expect find all to be executed successfully with 2 where conditions ', async () => {
    await service.findAll({ where: { originDescription: 'mar de ajo', destinationDescription: 'mar del plata' } });
  });
  it('expect find all to be executed successfully when not passing where clause ', async () => {
    await service.findAll();
  });
  it('expect findById to be executed successfully ', async () => {
    await service.findById(1);
  });
  it('expect InternalServerErrorException when trying to update a not finished trip', async () => {
    try {
      await service.update(1, plainToInstance(UpdateTripDTO, { finished: false }));
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect update method to be executed successfully ', async () => {
    const autobus: AutoBusDTO = plainToInstance(AutoBusDTO, {
      seats: [
        {
          id: 2,
          booked: true
        },
        {
          id: 1,
          booked: true
        }
      ]
    });
    jest.spyOn(mockedUtilsService, 'buildDTO').mockImplementation(() => autobus);
    await service.update(1, plainToInstance(UpdateTripDTO, { autobus: { id: 1 }, finished: true }));
  });
});
