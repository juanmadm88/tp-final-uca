import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UtilsService } from '../utils/utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDTO } from './dtos';
import { plainToInstance } from 'class-transformer';

describe('UserService', () => {
  let service: UserService;
  const mockedUtilsService = {
    buildDTO: jest.fn()
  };
  const repositoryMockFactory = jest.fn(() => ({
    findOneBy: jest.fn(),
    save: jest.fn()
  }));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: getRepositoryToken(User), useFactory: repositoryMockFactory }]
    }).compile();
    service = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expected an Object as a response when calling findAnUser method ', async () => {
    jest.spyOn(mockedUtilsService, 'buildDTO').mockImplementation(() =>
      Promise.resolve(
        plainToInstance(UserDTO, {
          id: 1
        })
      )
    );
    const result = await service.findAnUser({ id: 1 });
    expect(result.getId()).toBe(1);
  });
  it('expect created user successfully ', async () => {
    const dto: UserDTO = plainToInstance(UserDTO, {
      email: 'sarasa@gmail.com',
      password: '1232145',
      lastName: 'perez',
      firstName: 'pepito',
      username: 'jamesbond',
      role: {
        id: 1,
        description: 'admin'
      }
    });
    await service.createUser(dto);
  });
});
