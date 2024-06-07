import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTypeMapper } from './service-type.mapper';
import { ServiceType } from '../entities/service-type.entity';

describe('ServiceTypeMapper', () => {
  let service: ServiceTypeMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceTypeMapper]
    }).compile();
    service = module.get<ServiceTypeMapper>(ServiceTypeMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a Service Type as a response ', async () => {
      const dto: any = {
        isActive: true,
        getDescription: () => {
          return 'some description';
        },
        getIsActive: () => {
          return true;
        }
      };
      const response: ServiceType = service.transform(dto);
      expect(response).toBeInstanceOf(ServiceType);
      expect(response.description).toBe('some description');
    });
  });
});
