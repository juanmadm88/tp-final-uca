import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VerifyRoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const role = req.headers['user_role'];
    if (role != 'admin') {
      throw new ForbiddenException();
    }
    next();
  }
}
