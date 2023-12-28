import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UtilsService {
  public buildDTO(aPlainObject: any, classDTO: any): any {
    return plainToInstance(classDTO, aPlainObject, {
      excludeExtraneousValues: true
    });
  }
  public throwInternalServerIfErrorIsNotHttpExcetion(error: any): HttpException {
    if (!(error instanceof HttpException)) throw new InternalServerErrorException();
    throw error;
  }
}
