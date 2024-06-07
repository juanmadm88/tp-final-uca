import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { SeatType } from './entities/seat-type.entity';
import { UtilsService } from '../utils/utils.service';
import { SeatTypeDTO } from './dtos/seat-type.dto';
import { UpdateSeatTypeDTO } from './dtos/update-service-type.dto';
import { SeatTypeMapper } from './mapper/seat-type.mapper';

@Injectable()
export class SeatTypeService {
  constructor(@InjectRepository(SeatType) private readonly repository: Repository<SeatType>, private utils: UtilsService, private mapper: SeatTypeMapper) {}
  async findAll(options: FindManyOptions = {}): Promise<Array<SeatTypeDTO>> {
    let { where } = options;
    where ? { ...where, isActive: true } : (where = { isActive: true });
    options.where = where;
    if ((options.where as any)?.description) {
      (options.where as any).description = Like(`${(options.where as any).description}`);
    }
    return this.utils.buildDTO(await this.repository.find(options), SeatTypeDTO);
  }
  async update(id: number, updateDTO: UpdateSeatTypeDTO): Promise<any> {
    const entity: SeatType = this.mapper.transform(updateDTO);
    await this.repository.save({ ...entity, id });
  }

  async create(dto: SeatTypeDTO): Promise<any> {
    const entity: SeatType = this.mapper.transform(dto);
    await this.repository.save(entity);
  }
}
