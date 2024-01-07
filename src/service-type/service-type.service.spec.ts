import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTypeService } from './service-type.service';
import { UtilsService } from '../utils/utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceType } from './entities/service-type.entity';
import { plainToInstance } from 'class-transformer';
import { ServiceTypeDTO } from './dtos/service-type.dto';
import { UpdateServiceTypeDTO } from './dtos/update-service-type.dto';

describe('ServiceTypeService', () => {
  let service: ServiceTypeService;
  const mockedUtilsService = {
    buildDTO: jest.fn()
  };
  const mockedSave = jest.fn();
  const mockedFind = jest.fn();
  const mockedUpdate = jest.fn();
  const repositoryMockFactory = jest.fn(() => ({
    update: mockedUpdate,
    save: mockedSave,
    find: mockedFind
  }));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceTypeService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: getRepositoryToken(ServiceType), useFactory: repositoryMockFactory }]
    }).compile();
    service = module.get<ServiceTypeService>(ServiceTypeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expect an Error when create method fails ', async () => {
    mockedSave.mockImplementationOnce(() => Promise.reject({ status: 404 }));
    try {
      await service.create(plainToInstance(ServiceTypeDTO, { description: 'primera clase', isActive: true }));
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Array of Service Type when find method is called ', async () => {
    const result: Array<ServiceType> = [
      { description: 'primera clase', isActive: true, id: 1 },
      { description: 'economico', isActive: true, id: 2 }
    ];
    const dto: Array<ServiceTypeDTO> = plainToInstance(ServiceTypeDTO, result);
    mockedFind.mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findAll({ skip: 2, take: 1, where: { description: 'saras' } });
    expect(response).toBeDefined();
    const secondResponse = await service.findAll();
    expect(secondResponse).toBeDefined();
  });
  it('expect update method to be called succesfully ', async () => {
    const dto: UpdateServiceTypeDTO = plainToInstance(UpdateServiceTypeDTO, { description: 'primera clase' });
    mockedUpdate.mockImplementationOnce(() => Promise.resolve());
    await service.update(1, dto);
  });
});
