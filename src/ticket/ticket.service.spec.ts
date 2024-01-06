import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { TicketService } from './ticket.service';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { UpdateTicketDTO } from './dtos/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { Seat } from '../autobus/entities/seat.entity';

describe('TripService', () => {
  let service: TicketService;
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  it('should be defined', async () => {
    const mockedDataSource = {
      createQueryRunner: () => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          release: jest.fn(),
          manager: jest.fn
        };
      },
      getRepository: () => {
        return {
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              where: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => jest.fn()
                    };
                  }
                };
              }
            };
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, ConfigService]
    }).compile();
    service = module.get<TicketService>(TicketService);
    expect(service).toBeDefined();
  });
  it('expect update method to be successfully executed ', async () => {
    const ticket: Ticket = new Ticket();
    const firstSeat: Seat = new Seat();
    const secondSeat: Seat = new Seat();
    secondSeat.booked = true;
    ticket.seats = [];
    ticket.seats.push(firstSeat);
    ticket.seats.push(secondSeat);
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn()
        };
      }
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
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              where: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => ticket
                    };
                  }
                };
              }
            };
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }]
    }).compile();
    service = module.get<TicketService>(TicketService);
    expect(service).toBeDefined();
    await service.update(
      1,
      plainToInstance(UpdateTicketDTO, {
        cancelled: true
      })
    );
  });
  it('expect an error when update method fails ', async () => {
    const ticket: Ticket = new Ticket();
    const firstSeat: Seat = new Seat();
    const secondSeat: Seat = new Seat();
    secondSeat.booked = true;
    ticket.seats = [];
    ticket.seats.push(firstSeat);
    ticket.seats.push(secondSeat);
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.pricesConfig') {
          return JSON.parse(process.env.COSTS || '{"serviceTypeCost":{"primera clase":10000,"economico":5000},"seatTypeCost":{"asiento cama":10000,"asiento simple":5000},"fuelCostPerLt":900,"fuelPerKm":{"doble piso":2,"piso simple":1.78}}');
        }
      })
    };
    const mockedManager = {
      save: jest.fn(),
      update: jest.fn(),
      getRepository: () => {
        return {
          update: jest.fn()
        };
      }
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
          update: jest.fn(),
          createQueryBuilder: () => {
            return {
              where: () => {
                return {
                  innerJoinAndSelect: () => {
                    return {
                      getOne: () => Promise.reject({ error: 'some error' })
                    };
                  }
                };
              }
            };
          }
        };
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService, { provide: DataSource, useValue: mockedDataSource }, { provide: ConfigService, useValue: mockedConfigService }]
    }).compile();
    service = module.get<TicketService>(TicketService);
    expect(service).toBeDefined();
    try {
      await service.update(
        1,
        plainToInstance(UpdateTicketDTO, {
          cancelled: true
        })
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
