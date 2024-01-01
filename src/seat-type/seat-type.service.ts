import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SeatType } from './entities/seat-type.entity';
import { UtilsService } from '../utils/utils.service';
import { SeatTypeDTO } from './dtos/seat-type.dto';
import { UpdateSeatTypeDTO } from './dtos/update-service-type.dto';

@Injectable()
export class SeatTypeService {
  constructor(@InjectRepository(SeatType) private readonly repository: Repository<SeatType>, private utils: UtilsService) {}
  async findAll(paginationOptions: FindManyOptions = {}): Promise<Array<SeatTypeDTO>> {
    const pagination: any = {};
    if (paginationOptions.skip) pagination.skip = paginationOptions.skip;
    if (paginationOptions.take) pagination.take = paginationOptions.take;
    return this.utils.buildDTO(await this.repository.find({ where: { isActive: true }, ...pagination }), SeatTypeDTO);
  }
  async update(id: number, updateDTO: UpdateSeatTypeDTO): Promise<any> {
    const entity: SeatType = this.buildSeatTypeEntity(updateDTO);
    await this.repository.save({ ...entity, id });
  }
  private buildSeatTypeEntity(dto: any): SeatType {
    const entity: SeatType = new SeatType();
    if (dto.getDescription()) entity.description = dto.getDescription();
    if ('isActive' in dto && dto.getIsActive() != undefined) entity.isActive = dto.getIsActive();
    return entity;
  }
  async create(dto: SeatTypeDTO): Promise<any> {
    const entity: SeatType = this.buildSeatTypeEntity(dto);
    await this.repository.save(entity);
  }
}
