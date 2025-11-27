import { Test, TestingModule } from '@nestjs/testing';
import { AutobusMapper } from './autobus.mapper';
import { Autobus } from '../entities/autobus.entity';

describe('AutobusMapper', () => {
  let service: AutobusMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutobusMapper]
    }).compile();
    service = module.get<AutobusMapper>(AutobusMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a Autobus as a response ', async () => {
      const dto: any = {
        asigned: true,
        getId: () => {
          return '1012';
        },
        getAsigned: () => {
          return true;
        },
        getModel: () => {
          return {
            getDescription: () => {
              return 'some model';
            },
            getId: () => {
              return '12345';
            }
          };
        },
        getBrand: () => {
          return {
            getDescription: () => {
              return 'some brand';
            },
            getId: () => {
              return '12';
            }
          };
        },
        getSeats: () => {
          return [
            {
              booked: true,
              getBooked: () => {
                return true;
              },
              getRow: () => {
                return 2;
              },
              getColumn: () => {
                return 1;
              },
              getSeatType: () => {
                return {
                  getId: () => {
                    return '1234';
                  }
                };
              }
            }
          ];
        }
      };
      const response: Autobus = service.transform(dto);
      expect(response).toBeInstanceOf(Autobus);
      expect(response.id).toBe('1012');
    });
  });
});
