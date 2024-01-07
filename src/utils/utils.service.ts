import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Constants } from '../constants';
import { QueryParamsTicket } from '../trip/common';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class UtilsService {
  private readonly methods: any = {
    true: this.buildBooleanCriteria,
    false: this.buildStringCriteria
  };
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

  public buildOptions(args: QueryParamsTicket = {}): FindManyOptions {
    let result: any = {};
    let where: any = {};
    for (const key of Object.keys(args)) {
      if (['skip', 'size'].includes(key)) {
        const aux: any = {};
        aux[key] = args[key];
        result = { ...result, ...aux };
        continue;
      }
      const isCancelled: boolean = key === 'cancelled';
      const aux: any = {};
      aux[key] = this.methods[isCancelled.toString()](args[key]);
      where = { ...where, ...aux };
    }
    if (Object.keys(where).length > 0) result.where = where;
    return result;
  }
  private buildStringCriteria(value: string): string {
    return `%${value}%`;
  }
  private buildBooleanCriteria(value: string): boolean {
    return value === 'true';
  }
}
