import { Test, TestingModule } from '@nestjs/testing';
import { SeatTypeService } from './seat-type.service';
import { UtilsService } from '../utils/utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SeatType } from './entities/seat-type.entity';
import { plainToInstance } from 'class-transformer';
import { SeatTypeDTO } from './dtos/seat-type.dto';
import { UpdateSeatTypeDTO } from './dtos/update-service-type.dto';

describe('SeatTypeService', () => {
  let service: SeatTypeService;
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
      providers: [SeatTypeService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: getRepositoryToken(SeatType), useFactory: repositoryMockFactory }]
    }).compile();
    service = module.get<SeatTypeService>(SeatTypeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expect an Error when create method fails ', async () => {
    mockedSave.mockImplementationOnce(() => Promise.reject({ status: 404 }));
    try {
      await service.create(plainToInstance(SeatTypeDTO, { description: 'asiento cama', isActive: true }));
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Array of Seat Type when find method is called ', async () => {
    const result: Array<SeatType> = [
      { description: 'primera clase', isActive: true, id: 1 },
      { description: 'economico', isActive: true, id: 2 }
    ];
    const dto: Array<SeatTypeDTO> = plainToInstance(SeatTypeDTO, result);
    mockedFind.mockImplementationOnce(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementationOnce(() => Promise.resolve(dto));
    const response = await service.findAll({ skip: 2, take: 1 });
    expect(response).toBeDefined();
  });
  it('expect update method to be called succesfully ', async () => {
    const dto: UpdateSeatTypeDTO = plainToInstance(UpdateSeatTypeDTO, { description: 'asiento cama' });
    mockedUpdate.mockImplementationOnce(() => Promise.resolve());
    await service.update(1, dto);
  });
});
