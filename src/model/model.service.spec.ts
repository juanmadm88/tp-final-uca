import { Test, TestingModule } from '@nestjs/testing';
import { ModelService } from './model.service';
import { UtilsService } from '../utils/utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { plainToInstance } from 'class-transformer';
import { ModelDTO } from './dtos/model.dto';

describe('ModelService', () => {
  let service: ModelService;
  const mockedUtilsService = {
    buildDTO: jest.fn()
  };
  const mockedSave = jest.fn();
  const mockedFind = jest.fn();
  const repositoryMockFactory = jest.fn(() => ({
    save: mockedSave,
    find: mockedFind
  }));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: getRepositoryToken(Model), useFactory: repositoryMockFactory }]
    }).compile();
    service = module.get<ModelService>(ModelService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expect an Error when create method fails ', async () => {
    mockedSave.mockImplementationOnce(() => Promise.reject({ status: 404 }));
    try {
      await service.create(plainToInstance(ModelDTO, { description: 'modelo 1' }));
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Array of Brand when find method is called ', async () => {
    const result: Array<Model> = [
      { description: 'modelo 1', id: 1 },
      { description: 'modelo 2', id: 2 }
    ];
    const dto: Array<ModelDTO> = plainToInstance(ModelDTO, result);
    mockedFind.mockImplementationOnce(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementationOnce(() => Promise.resolve(dto));
    const response = await service.findAll({ skip: 2, take: 1 });
    expect(response).toBeDefined();
  });
});
