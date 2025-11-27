import { Test, TestingModule } from '@nestjs/testing';
import { SeatTypeMapper } from './seat-type.mapper';
import { SeatType } from '../entities/seat-type.entity';

describe('SeatTypeMapper', () => {
  let service: SeatTypeMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatTypeMapper]
    }).compile();
    service = module.get<SeatTypeMapper>(SeatTypeMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a Seat Type as a response ', async () => {
      const dto: any = {
        isActive: true,
        getDescription: () => {
          return 'some description';
        },
        getIsActive: () => {
          return true;
        }
      };
      const response: SeatType = service.transform(dto);
      expect(response).toBeInstanceOf(SeatType);
      expect(response.description).toBe('some description');
    });
  });
});
