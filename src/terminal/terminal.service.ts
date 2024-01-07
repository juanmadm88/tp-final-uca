import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Terminal } from './entities/terminal.entity';
import { UtilsService } from '../utils/utils.service';
import { TerminalDTO } from './dtos/terminal.dto';

@Injectable()
export class TerminalService {
  constructor(@InjectRepository(Terminal) private readonly repository: Repository<Terminal>, private utils: UtilsService) {}
  async findAll(options: FindManyOptions = {}): Promise<Array<TerminalDTO>> {
    if ((options.where as any)?.description) {
      (options.where as any).description = Like(`${(options.where as any).description}`);
    }
    return this.utils.buildDTO(await this.repository.find(options), TerminalDTO);
  }
  private buildModelEntity(dto: any): Terminal {
    const entity: Terminal = new Terminal();
    if (dto.getDescription()) entity.description = dto.getDescription();
    if (dto.getKilometer()) entity.kilometer = dto.getKilometer();
    return entity;
  }
  async create(dto: TerminalDTO): Promise<any> {
    const entity: Terminal = this.buildModelEntity(dto);
    await this.repository.save(entity);
  }
}
