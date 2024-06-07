import { Test, TestingModule } from '@nestjs/testing';
import { Brand } from '../entities/brand.entity';
import { BrandMapper } from './brand.mapper';

describe('BrandMapper', () => {
  let service: BrandMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandMapper]
    }).compile();
    service = module.get<BrandMapper>(BrandMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a Brand as a response ', async () => {
      const dto: any = {
        getDescription: () => {
          return 'some description';
        }
      };
      const response: Brand = service.transform(dto);
      expect(response).toBeInstanceOf(Brand);
      expect(response.description).toBe('some description');
    });
  });
});
