import { Test, TestingModule } from '@nestjs/testing';
import { TripMapper } from './trip.mapper';
import { Trip } from '../entities/trip.entity';

describe('TripMapper', () => {
  let service: TripMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripMapper]
    }).compile();
    service = module.get<TripMapper>(TripMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a Trip as a response ', async () => {
      const dto: any = {
        getArrivalDate: () => {
          return '2024-02-04';
        },
        getDepartureDate: () => {
          return '2024-02-04';
        },
        getAutobus: () => {
          return {
            getId: () => {
              return '12345';
            }
          };
        },
        getDestination: () => {
          return {
            getId: () => {
              return '12345';
            }
          };
        },
        getOrigin: () => {
          return {
            getId: () => {
              return '12345';
            }
          };
        }
      };
      const response: Trip = service.transform(dto, false);
      expect(response).toBeInstanceOf(Trip);
      expect(response.departureDate).toBe('2024-02-04');
    });
    it('expect a Trip as a response when calling with updated argument equals true ', async () => {
      const dto: any = {
        getFinished: () => {
          return true;
        }
      };
      const response: Trip = service.transform(dto, true);
      expect(response).toBeInstanceOf(Trip);
      expect(response.finished).toBe(true);
    });
  });
});
