import { Test, TestingModule } from '@nestjs/testing';
import { Model } from '../entities/model.entity';
import { ModelMapper } from './model.mapper';

describe('ModelMapper', () => {
  let service: ModelMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelMapper]
    }).compile();
    service = module.get<ModelMapper>(ModelMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a Model as a response ', async () => {
      const dto: any = {
        getDescription: () => {
          return 'some description';
        }
      };
      const response: Model = service.transform(dto);
      expect(response).toBeInstanceOf(Model);
      expect(response.description).toBe('some description');
    });
  });
});
