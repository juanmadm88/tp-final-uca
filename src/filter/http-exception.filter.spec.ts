import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter ', () => {
  let filter: HttpExceptionFilter;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionFilter]
    }).compile();
    filter = app.get<HttpExceptionFilter>(HttpExceptionFilter);
  });
  it('expected json method to be called ', async () => {
    const exception = new InternalServerErrorException();
    const mockedJson = {
      json: jest.fn()
    };
    const mockedStatus = jest.fn().mockImplementation(() => {
      return mockedJson;
    });
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
    (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
      headers: { 'x-flow-country': 'pe' }
    });
    (executionContext.switchToHttp().getResponse as jest.Mock<any, any>).mockReturnValueOnce({
      data: { data: 'mocked data' },
      headers: { 'x-flow-country': 'pe' },
      status: mockedStatus
    });
    const spy = jest.spyOn(mockedJson, 'json');
    filter.catch(exception, executionContext);
    expect(spy).toBeCalled();
  });
});
