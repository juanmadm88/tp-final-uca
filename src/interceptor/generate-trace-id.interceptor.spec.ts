import { GenerateTraceIdInterceptor } from './generate-trace-id.interceptor';

describe('GenerateTraceIdInterceptor ', () => {
  it('should expect to be defined', async () => {
    const interceptor: GenerateTraceIdInterceptor =
      new GenerateTraceIdInterceptor();
    expect(interceptor).toBeDefined();
  });

  describe('intercept ', () => {
    it('expected callHandler to be called ', async () => {
      const interceptor: GenerateTraceIdInterceptor =
        new GenerateTraceIdInterceptor();
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
      (
        executionContext.switchToHttp().getRequest as jest.Mock<any, any>
      ).mockReturnValueOnce({
        body: { data: 'mocked data' },
        headers: { 'x-flow-country': 'pe' }
      });
      const actualValue = await interceptor.intercept(
        executionContext,
        callHandler
      );
      expect(actualValue).toBeDefined();
      expect(callHandler.handle).toBeCalledTimes(1);
    });
  });
});
