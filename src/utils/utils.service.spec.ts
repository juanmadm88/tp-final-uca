import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { LoginDTO } from '../user/dtos/login.dto';

describe('UtilsService', () => {
  let service: UtilsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService]
    }).compile();
    service = module.get<UtilsService>(UtilsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should expect a DTO with its attributes ', () => {
    const plainObject = {
      username: 'pepito',
      password: '12345'
    };
    const result: any = service.buildDTO(plainObject, LoginDTO);
    expect(result).toBeInstanceOf(LoginDTO);
  });
});
