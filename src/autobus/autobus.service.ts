import { Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AutoBusDTO } from './dtos/autobus.dto';
import { DataSource, FindManyOptions, Like } from 'typeorm';
import { Autobus } from './entities/autobus.entity';
import { Seat } from './entities/seat.entity';
import { UpdateAutoBusDTO } from './dtos/update-autobus.dto';
import { AutobusMapper } from './mapper/autobus.mapper';

@Injectable()
export class AutobusService {
  constructor(private utils: UtilsService, private dataSource: DataSource, private mapper: AutobusMapper) {}
  async create(dto: AutoBusDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(this.mapper.transform(dto));
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, dto: UpdateAutoBusDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(Autobus, id, { asigned: dto.getAsigned() });
      if (dto.getSeats()) {
        for (const seat of dto.getSeats()) {
          await queryRunner.manager.update(Seat, seat.getId(), { booked: seat.getBooked() });
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async findAll(options: FindManyOptions = {}): Promise<Array<AutoBusDTO>> {
    const queryRunner = this.dataSource.createQueryRunner();
    if ((options.where as any)?.description) {
      (options.where as any).description = Like(`${(options.where as any).description}`);
    }
    return this.utils.buildDTO(await queryRunner.manager.find(Autobus, options), AutoBusDTO);
  }

  async findById(id: number): Promise<AutoBusDTO> {
    const queryRunner = this.dataSource.createQueryRunner();
    return this.utils.buildDTO(await queryRunner.manager.findOne(Autobus, { where: { id }, relations: ['seats'] }), AutoBusDTO);
  }
}
