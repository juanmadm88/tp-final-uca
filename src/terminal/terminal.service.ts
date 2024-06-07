import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Terminal } from './entities/terminal.entity';
import { UtilsService } from '../utils/utils.service';
import { TerminalDTO } from './dtos/terminal.dto';
import { TerminalMapper } from './mapper/terminal.mapper';

@Injectable()
export class TerminalService {
  constructor(@InjectRepository(Terminal) private readonly repository: Repository<Terminal>, private utils: UtilsService, private mapper: TerminalMapper) {}
  async findAll(options: FindManyOptions = {}): Promise<Array<TerminalDTO>> {
    if ((options.where as any)?.description) {
      (options.where as any).description = Like(`${(options.where as any).description}`);
    }
    return this.utils.buildDTO(await this.repository.find(options), TerminalDTO);
  }
  async create(dto: TerminalDTO): Promise<any> {
    const entity: Terminal = this.mapper.transform(dto);
    await this.repository.save(entity);
  }
}
