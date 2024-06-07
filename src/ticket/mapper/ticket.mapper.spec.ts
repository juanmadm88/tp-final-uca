import { Test, TestingModule } from '@nestjs/testing';
import { TicketMapper } from './ticket.mapper';
import { Ticket } from '../entities/ticket.entity';

describe('TicketMapper', () => {
  let service: TicketMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketMapper]
    }).compile();
    service = module.get<TicketMapper>(TicketMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a Ticket as a response ', async () => {
      const dto: any = {
        booked: true,
        getBooked: () => {
          return true;
        },
        getServiceType: () => {
          return {
            getId: () => {
              return '14';
            }
          };
        },
        getUser: () => {
          return {
            getId: () => {
              return '13';
            }
          };
        },
        getTrip: () => {
          return {
            getId: () => {
              return '12';
            }
          };
        },
        getSeat: () => {
          return {
            getId: () => {
              return '11';
            }
          };
        }
      };
      const response: Ticket = service.transform({ ...dto, price: 123 });
      expect(response).toBeInstanceOf(Ticket);
      expect(response.price).toBe(123);
    });
  });
});
