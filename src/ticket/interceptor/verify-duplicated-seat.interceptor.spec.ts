import { plainToInstance } from 'class-transformer';
import { UtilsService } from '../../utils/utils.service';
import { VerifyDuplicatedSeatInterceptor } from './verify-duplicated-seat.interceptor';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketsDTO } from '../dtos/tickets.dto';
import { BadRequestException } from '@nestjs/common';

describe('VerifyDuplicatedSeatInterceptor ', () => {
  it('should expect to be defined', async () => {
    const mockedUtilsService = {
      buildDTO: jest.fn()
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UtilsService, useValue: mockedUtilsService }, VerifyDuplicatedSeatInterceptor]
    }).compile();
    const interceptor = app.get<VerifyDuplicatedSeatInterceptor>(VerifyDuplicatedSeatInterceptor);
    expect(interceptor).toBeDefined();
  });

  describe('intercept ', () => {
    it('expected callHandler to be called when request method is not a POST and request path is not "/api/v1/transport/ticket/bulk" ', async () => {
      const mockedUtilsService = {
        buildDTO: jest.fn()
      };
      const app: TestingModule = await Test.createTestingModule({
        providers: [{ provide: UtilsService, useValue: mockedUtilsService }, VerifyDuplicatedSeatInterceptor]
      }).compile();
      const interceptor = app.get<VerifyDuplicatedSeatInterceptor>(VerifyDuplicatedSeatInterceptor);
      const executionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnThis(),
        getClass: jest.fn().mockReturnThis(),
        getHandler: jest.fn().mockReturnThis(),
        getArgs: jest.fn().mockReturnThis(),
        getArgByIndex: jest.fn().mockReturnThis(),
        switchToRpc: jest.fn().mockReturnThis(),
        switchToWs: jest.fn().mockReturnThis(),
        getType: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnThis()
      };
      const callHandler = {
        handle: jest.fn().mockReturnThis()
      };
      (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
        method: 'GET',
        path: '/v1/prueba'
      });
      const actualValue = interceptor.intercept(executionContext, callHandler);
      expect(actualValue).toBeDefined();
      expect(callHandler.handle).toBeCalledTimes(1);
    });
    it('expected callHandler to be called when request method is a POST and request path is "/api/v1/transport/ticket/bulk" and there no duplicated seats ', async () => {
      const mockedUtilsService = {
        buildDTO: jest.fn()
      };
      const app: TestingModule = await Test.createTestingModule({
        providers: [{ provide: UtilsService, useValue: mockedUtilsService }, VerifyDuplicatedSeatInterceptor]
      }).compile();
      const interceptor = app.get<VerifyDuplicatedSeatInterceptor>(VerifyDuplicatedSeatInterceptor);
      const executionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnThis(),
        getClass: jest.fn().mockReturnThis(),
        getHandler: jest.fn().mockReturnThis(),
        getArgs: jest.fn().mockReturnThis(),
        getArgByIndex: jest.fn().mockReturnThis(),
        switchToRpc: jest.fn().mockReturnThis(),
        switchToWs: jest.fn().mockReturnThis(),
        getType: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnThis()
      };
      const callHandler = {
        handle: jest.fn().mockReturnThis()
      };
      (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
        method: 'POST',
        path: '/api/v1/transport/ticket/bulk'
      });
      const actualValue = interceptor.intercept(executionContext, callHandler);
      expect(actualValue).toBeDefined();
      expect(callHandler.handle).toBeCalledTimes(1);
    });
  });
  it('expected a Bad Request Error when request method is a POST and request path is "/api/v1/transport/ticket/bulk" and there duplicated seats ', async () => {
    const mockedUtilsService = {
      buildDTO: jest.fn()
    };
    jest.spyOn(mockedUtilsService, 'buildDTO').mockImplementationOnce(() => {
      return plainToInstance(TicketsDTO, {
        tickets: [
          {
            user: {
              id: 17,
              username: 'prueba'
            },
            trip: {
              id: 8
            },
            seat: {
              id: 2
            },
            serviceType: {
              id: 23
            }
          },
          {
            user: {
              id: 17,
              username: 'prueba'
            },
            trip: {
              id: 8
            },
            seat: {
              id: 2
            },
            serviceType: {
              id: 23
            }
          }
        ]
      });
    });
    const app: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UtilsService, useValue: mockedUtilsService }, VerifyDuplicatedSeatInterceptor]
    }).compile();
    const interceptor = app.get<VerifyDuplicatedSeatInterceptor>(VerifyDuplicatedSeatInterceptor);
    const executionContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnThis(),
      getClass: jest.fn().mockReturnThis(),
      getHandler: jest.fn().mockReturnThis(),
      getArgs: jest.fn().mockReturnThis(),
      getArgByIndex: jest.fn().mockReturnThis(),
      switchToRpc: jest.fn().mockReturnThis(),
      switchToWs: jest.fn().mockReturnThis(),
      getType: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnThis()
    };
    const callHandler = {
      handle: jest.fn().mockReturnThis()
    };
    (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
      method: 'POST',
      path: '/api/v1/transport/ticket/bulk'
    });
    try {
      await interceptor.intercept(executionContext, callHandler);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
