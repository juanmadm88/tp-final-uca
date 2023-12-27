import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UtilsService {
  public buildDTO(aPlainObject: any, classDTO: any): any {
    return plainToInstance(classDTO, aPlainObject, {
      excludeExtraneousValues: true
    });
  }
}
