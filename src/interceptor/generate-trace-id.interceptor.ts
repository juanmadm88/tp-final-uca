import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class GenerateTraceIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.headers['unique-trace-id'] = this.generateUuid();
    return next.handle();
  }
  private generateUuid(): number {
    return uuidv4();
  }
}
