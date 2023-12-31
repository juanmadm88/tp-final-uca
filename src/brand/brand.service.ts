import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { UtilsService } from '../utils/utils.service';
import { BrandDTO } from './dtos/brand.dto';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private readonly repository: Repository<Brand>, private utils: UtilsService) {}
  async findAll(paginationOptions: FindManyOptions = {}): Promise<Array<BrandDTO>> {
    const pagination: any = {};
    if (paginationOptions.skip) pagination.skip = paginationOptions.skip;
    if (paginationOptions.take) pagination.take = paginationOptions.take;
    return this.utils.buildDTO(await this.repository.find(pagination), BrandDTO);
  }
  private buildBrandEntity(dto: any): Brand {
    const entity: Brand = new Brand();
    if (dto.getDescription()) entity.description = dto.getDescription();
    return entity;
  }
  async create(dto: BrandDTO): Promise<any> {
    const entity: Brand = this.buildBrandEntity(dto);
    await this.repository.save(entity);
  }
}
