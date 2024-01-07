import { Test, TestingModule } from '@nestjs/testing';
import { TerminalService } from './terminal.service';
import { UtilsService } from '../utils/utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Terminal } from './entities/terminal.entity';
import { plainToInstance } from 'class-transformer';
import { TerminalDTO } from './dtos/terminal.dto';

describe('TerminalService', () => {
  let service: TerminalService;
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
      providers: [TerminalService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: getRepositoryToken(Terminal), useFactory: repositoryMockFactory }]
    }).compile();
    service = module.get<TerminalService>(TerminalService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expect an Error when create method fails ', async () => {
    mockedSave.mockImplementationOnce(() => Promise.reject({ status: 404 }));
    try {
      await service.create(plainToInstance(TerminalDTO, { description: 'mar de ajo', kilometer: 300 }));
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Array of Terminal when find method is called ', async () => {
    const result: Array<Terminal> = [
      { description: 'mar de ajo', kilometer: 300, id: 1 },
      { description: 'mar del plata', kilometer: 400, id: 2 }
    ];
    const dto: Array<TerminalDTO> = plainToInstance(TerminalDTO, result);
    mockedFind.mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findAll({ skip: 2, take: 1, where: { description: 'sarasa' } });
    expect(response).toBeDefined();
    const secondResponse = await service.findAll();
    expect(secondResponse).toBeDefined();
  });
});
