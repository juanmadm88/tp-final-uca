import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Constants } from '../constants';

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
  public buildQuery(where = {}, entity: string): string {
    let query = '';
    if (!Object.keys(where).length || !Constants.WHERE_CLAUSES[entity]) {
      return query;
    }
    Object.keys(where).forEach((key) => {
      if (Constants.WHERE_CLAUSES[entity][key]) query += `${query ? ' AND' : ''} ${Constants.WHERE_CLAUSES[entity][key]}`;
    });
    return query;
  }
}
