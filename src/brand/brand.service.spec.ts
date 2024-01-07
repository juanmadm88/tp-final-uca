import { Test, TestingModule } from '@nestjs/testing';
import { BrandService } from './brand.service';
import { UtilsService } from '../utils/utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { plainToInstance } from 'class-transformer';
import { BrandDTO } from './dtos/brand.dto';

describe('BrandService', () => {
  let service: BrandService;
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
      providers: [BrandService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: getRepositoryToken(Brand), useFactory: repositoryMockFactory }]
    }).compile();
    service = module.get<BrandService>(BrandService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expect an Error when create method fails ', async () => {
    mockedSave.mockImplementationOnce(() => Promise.reject({ status: 404 }));
    try {
      await service.create(plainToInstance(BrandDTO, { description: 'Toyota' }));
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Array of Brand when find method is called ', async () => {
    const result: Array<Brand> = [
      { description: 'Toyota', id: 1 },
      { description: 'Scania', id: 2 }
    ];
    const dto: Array<BrandDTO> = plainToInstance(BrandDTO, result);
    mockedFind.mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findAll({ skip: 2, take: 1, where: { description: 'sarasa' } });
    expect(response).toBeDefined();
    const secondResponse = await service.findAll();
    expect(secondResponse).toBeDefined();
  });
});
