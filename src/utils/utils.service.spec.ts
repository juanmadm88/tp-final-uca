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
  it('expect empty string when calling buildQuery method with empty where ', () => {
    const result = service.buildQuery(undefined, 'trip');
    expect(!result.length).toBeTruthy();
  });
  it('expect empty string when calling buildQuery method with not valid entity ', () => {
    const result = service.buildQuery({ atributte: 1 }, 'not valid');
    expect(!result.length).toBeTruthy();
  });
  it('expect string query  ', () => {
    const result = service.buildQuery({ originDescription: 'mar de ajo', destinationDescription: 'mar del plata' }, 'trip');
    expect(result.length).toBeTruthy();
  });
  it('expect empty object  ', () => {
    const result = service.buildOptions(undefined);
    expect(!Object.keys(result).length).toBeTruthy();
  });
  it('expect object with keys  ', () => {
    const result = service.buildOptions({ skip: 10, size: 30, cancelled: 'false', tripArrivalDate: '2022' });
    expect(Object.keys(result).length).toBeTruthy();
  });
});
