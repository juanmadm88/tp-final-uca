import { Test, TestingModule } from '@nestjs/testing';
import { Terminal } from '../entities/terminal.entity';
import { TerminalMapper } from './terminal.mapper';

describe('TerminalMapper', () => {
  let service: TerminalMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminalMapper]
    }).compile();
    service = module.get<TerminalMapper>(TerminalMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a Terminal as a response ', async () => {
      const dto: any = {
        getDescription: () => {
          return 'some description';
        },
        getKilometer: () => {
          return 10;
        }
      };
      const response: Terminal = service.transform(dto);
      expect(response).toBeInstanceOf(Terminal);
      expect(response.description).toBe('some description');
    });
  });
});
