import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { UtilsService } from '../utils/utils.service';
import { ModelDTO } from './dtos/model.dto';

@Injectable()
export class ModelService {
  constructor(@InjectRepository(Model) private readonly repository: Repository<Model>, private utils: UtilsService) {}
  async findAll(options: FindManyOptions = {}): Promise<Array<ModelDTO>> {
    if ((options.where as any)?.description) {
      (options.where as any).description = Like(`${(options.where as any).description}`);
    }
    return this.utils.buildDTO(await this.repository.find(options), ModelDTO);
  }
  private buildModelEntity(dto: any): Model {
    const entity: Model = new Model();
    if (dto.getDescription()) entity.description = dto.getDescription();
    return entity;
  }
  async create(dto: ModelDTO): Promise<any> {
    const entity: Model = this.buildModelEntity(dto);
    await this.repository.save(entity);
  }
}
