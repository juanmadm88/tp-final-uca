import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ServiceType } from './entities/service-type.entity';
import { UtilsService } from '../utils/utils.service';
import { ServiceTypeDTO } from './dtos/service-type.dto';
import { UpdateServiceTypeDTO } from './dtos/update-service-type.dto';

@Injectable()
export class ServiceTypeService {
  constructor(@InjectRepository(ServiceType) private readonly repository: Repository<ServiceType>, private utils: UtilsService) {}
  async findAll(paginationOptions: FindManyOptions = {}): Promise<Array<ServiceTypeDTO>> {
    const pagination: any = {};
    if (paginationOptions.skip) pagination.skip = paginationOptions.skip;
    if (paginationOptions.take) pagination.take = paginationOptions.take;
    return this.utils.buildDTO(await this.repository.find(pagination), ServiceTypeDTO);
  }
  async update(id: number, updateDTO: UpdateServiceTypeDTO): Promise<any> {
    const entity: ServiceType = this.buildServiceTypeEntity(updateDTO);
    await this.repository.save({ ...entity, id });
  }
  private buildServiceTypeEntity(dto: any): ServiceType {
    const entity: ServiceType = new ServiceType();
    if (dto.getDescription()) entity.description = dto.getDescription();
    if ('isActive' in dto) entity.isActive = dto.getIsActive();
    return entity;
  }
  async create(dto: ServiceTypeDTO): Promise<any> {
    const entity: ServiceType = this.buildServiceTypeEntity(dto);
    await this.repository.save(entity);
  }
}
