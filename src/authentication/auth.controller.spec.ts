import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';
import { LoginDTO, UserDTO } from '../user/dtos';
import { plainToInstance } from 'class-transformer';
describe('AuthController', () => {
  let controller: AuthController;
  const mockedAuthService = {
    signUp: jest.fn(),
    login: jest.fn()
  };
  const mockedLogger = {
    log: jest.fn()
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockedAuthService },
        { provide: Logger, useValue: mockedLogger }
      ]
    }).compile();
    controller = app.get<AuthController>(AuthController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('expect signup method executed successfully', async () => {
    const spy = jest.spyOn(mockedAuthService, 'signUp').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: UserDTO = plainToInstance(UserDTO, { email: 'sarasa@gmail.com', password: '1234', username: 'pepito' });
    await controller.signUp(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect login method executed successfully', async () => {
    const spy = jest.spyOn(mockedAuthService, 'login').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: LoginDTO = plainToInstance(LoginDTO, { password: '1234', username: 'pepito' });
    await controller.login(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an error when login method fails', async () => {
    jest.spyOn(mockedAuthService, 'login').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: LoginDTO = plainToInstance(LoginDTO, { password: '1234', username: 'pepito' });
    try {
      await controller.login(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an error when signUp method fails', async () => {
    jest.spyOn(mockedAuthService, 'signUp').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: UserDTO = plainToInstance(UserDTO, { email: 'sarasa@gmail.com', password: '1234', username: 'pepito' });
    try {
      await controller.signUp(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
