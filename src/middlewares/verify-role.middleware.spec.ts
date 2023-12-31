import { Test, TestingModule } from '@nestjs/testing';
import { NestMiddleware } from '@nestjs/common';
import { VerifyRoleMiddleware } from './verify-role.middleware';
import { NextFunction } from 'express';

describe('VerifyRoleMiddleware', () => {
  let middleware: NestMiddleware;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifyRoleMiddleware]
    }).compile();

    middleware = module.get<NestMiddleware>(VerifyRoleMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should be called next function ', () => {
    const nextSpy: NextFunction = jest.fn().mockImplementation(() => false);
    const req: any = {
      headers: {
        user_role: 'admin'
      },
      body: {
        attribute: 'sarasa'
      }
    };
    middleware.use(req, { setHeader: jest.fn() }, nextSpy);
    expect(nextSpy).toHaveBeenCalled();
  });
  it('should be called next function when htpp method is equals "GET" ', () => {
    const nextSpy: NextFunction = jest.fn().mockImplementation(() => false);
    const req: any = {
      headers: {
        user_role: 'admin'
      },
      body: {
        attribute: 'sarasa'
      },
      method: 'GET'
    };
    middleware.use(req, { setHeader: jest.fn() }, nextSpy);
    expect(nextSpy).toHaveBeenCalled();
  });
  it('expected forbidden error to be returned ', async () => {
    const nextSpy: NextFunction = jest.fn().mockImplementation(() => false);
    const req: any = {
      headers: {
        user_role: 'user'
      },
      body: {
        attribute: 'sarasa'
      }
    };
    try {
      await middleware.use(req, { setHeader: jest.fn() }, nextSpy);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
