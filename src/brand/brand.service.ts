import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { UtilsService } from '../utils/utils.service';
import { BrandDTO } from './dtos/brand.dto';
import { BrandMapper } from './mapper/brand.mapper';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private readonly repository: Repository<Brand>, private utils: UtilsService, private mapper: BrandMapper) {}
  async findAll(options: FindManyOptions = {}): Promise<Array<BrandDTO>> {
    if ((options.where as any)?.description) {
      (options.where as any).description = Like(`${(options.where as any).description}`);
    }
    return this.utils.buildDTO(await this.repository.find(options), BrandDTO);
  }
  async create(dto: BrandDTO): Promise<any> {
    const entity: Brand = this.mapper.transform(dto);
    await this.repository.save(entity);
  }
}
