import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { LoginDTO, UserDTO } from '../user/dtos';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  const mockedConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'appConfig.salt') {
        return 10;
      }
    })
  };
  const mockedJwtService = {
    signAsync: jest.fn()
  };
  const mockedUserService = {
    findAnUser: jest.fn(),
    createUser: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockedUserService },
        { provide: ConfigService, useValue: mockedConfigService },
        { provide: JwtService, useValue: mockedJwtService }
      ]
    }).compile();
    service = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expected bad request exception when user already exists after calling sign up method ', async () => {
    const plainObject = {
      username: 'sarlanga',
      email: 'sarasa@gmail.com',
      password: '123353'
    };
    jest
      .spyOn(mockedUserService, 'findAnUser')
      .mockImplementation(() =>
        Promise.resolve(plainToInstance(UserDTO, plainObject))
      );
    try {
      const dto: UserDTO = plainToInstance(UserDTO, plainObject);
      await service.signUp(dto);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
  it('expected user to be created successfully ', async () => {
    const plainObject = {
      username: 'sarlanga',
      email: 'sarasa@gmail.com',
      password: '123353'
    };
    jest
      .spyOn(mockedUserService, 'findAnUser')
      .mockImplementation(() => Promise.resolve(undefined));
    jest
      .spyOn(mockedUserService, 'createUser')
      .mockImplementation(() =>
        Promise.resolve(plainToInstance(UserDTO, plainObject))
      );
    const spy = jest.spyOn(mockedConfigService, 'get');
    const dto: UserDTO = plainToInstance(UserDTO, plainObject);
    await service.signUp(dto);
    expect(spy).toBeCalledTimes(1);
  });
  it('expected unauthorized exception when user is not found in the database ', async () => {
    const plainObject = {
      username: 'sarlanga',
      email: 'sarasa@gmail.com',
      password: '123353'
    };
    jest
      .spyOn(mockedUserService, 'findAnUser')
      .mockImplementation(() => Promise.resolve(undefined));
    const dto: LoginDTO = plainToInstance(LoginDTO, plainObject);
    try {
      await service.login(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });
  it('expected unauthorized exception when user attempts to log with a wrong password ', async () => {
    const plainObjectDB = {
      username: 'sarlanga',
      email: 'sarasa@gmail.com',
      password: '123353'
    };
    const plainObject = {
      username: 'sarlanga',
      email: 'sarasa@gmail.com',
      password: '123353'
    };
    jest
      .spyOn(mockedUserService, 'findAnUser')
      .mockImplementation(() =>
        Promise.resolve(plainToInstance(LoginDTO, plainObjectDB))
      );
    const dto: LoginDTO = plainToInstance(LoginDTO, plainObject);
    try {
      await service.login(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });
  it('expected Jwt object returned when logging successfully ', async () => {
    const spy = jest
      .spyOn(mockedJwtService, 'signAsync')
      .mockImplementation(() =>
        Promise.resolve(
          '$2b$10$pCior7DjLgX78bzJySrsj.TE8lx49IvInWUSveP/gLWDFxgdD2S1S'
        )
      );
    const plainObjectDB = {
      username: 'sarlanga',
      email: 'sarasa@gmail.com',
      password: '$2b$10$pCior7DjLgX78bzJySrsj.TE8lx49IvInWUSveP/gLWDFxgdD2S1S',
      id: 123
    };
    const plainObject = {
      username: 'sarlanga',
      email: 'sarasa@gmail.com',
      password: '123353'
    };
    jest
      .spyOn(mockedUserService, 'findAnUser')
      .mockImplementation(() =>
        Promise.resolve(plainToInstance(UserDTO, plainObjectDB))
      );
    const dto: LoginDTO = plainToInstance(LoginDTO, plainObject);
    const result = await service.login(dto);
    expect(result).toBeDefined();
    expect(spy).toBeCalledTimes(1);
  });
});
